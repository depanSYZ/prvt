// middleware.ts — Rate limiting + Auth protection + Lang routing
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET  = new TextEncoder().encode("snaptok-jwt-secret-2026-defandryan");
const COOKIE_NAME = "snaptok_session";
const VALID_LANGS = ["en", "id", "ru", "zh", "ar"];

// ── Rate limit store (in-memory) ──────────────────────────────────────────────
const store = new Map<string, { count: number; resetAt: number }>();
let lastClean = Date.now();

interface RuleConfig { limit: number; windowMs: number; }

const RATE_RULES: Record<string, RuleConfig> = {
  "/api/auth/send-otp":         { limit: 5,  windowMs: 60_000  },
  "/api/auth/verify-otp":       { limit: 10, windowMs: 60_000  },
  "/api/auth/verify-turnstile": { limit: 10, windowMs: 60_000  },
  "/api/auth/reset-password":   { limit: 3,  windowMs: 300_000 },
  "/api/v3/download":           { limit: 60, windowMs: 60_000  },
  "/api/v3/tiktok/search":      { limit: 30, windowMs: 60_000  },
};

function getIP(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "127.0.0.1"
  );
}

function checkRateLimit(key: string, rule: RuleConfig): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  // Bersihkan entries lama tiap 5 menit
  if (now - lastClean > 5 * 60_000) {
    lastClean = now;
    for (const [k, v] of store.entries()) { if (now > v.resetAt) store.delete(k); }
  }
  const existing = store.get(key);
  if (!existing || now > existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { limited: false, retryAfter: 0 };
  }
  existing.count++;
  if (existing.count > rule.limit) {
    return { limited: true, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

// ── Session helper ────────────────────────────────────────────────────────────
async function getSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch { return null; }
}

// ── Main middleware ───────────────────────────────────────────────────────────
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── 1. Rate limiting ───────────────────────────────────────────────────────
  const rule = RATE_RULES[pathname];
  if (rule) {
    const ip  = getIP(req);
    const { limited, retryAfter } = checkRateLimit(`${ip}:${pathname}`, rule);
    if (limited) {
      return new NextResponse(
        JSON.stringify({
          author: "Snaptok", success: false,
          error:  "Terlalu banyak request. Coba lagi dalam beberapa saat.",
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type":        "application/json",
            "Retry-After":         String(retryAfter),
            "X-RateLimit-Limit":   String(rule.limit),
          },
        }
      );
    }
  }

  // ── 2. Auth protection — /docs butuh login ─────────────────────────────────
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    const session = await getSession(req);
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── 3. Auth protection — /auth/profile butuh login ────────────────────────
  if (pathname.startsWith("/auth/profile")) {
    const session = await getSession(req);
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // ── 4. /logout page — langsung redirect ke / setelah clear cookie ──────────
  if (pathname === "/logout") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    const res = NextResponse.redirect(url);
    // Expire cookie dengan maxAge 0 — lebih reliable dari .delete()
    res.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   0,
      path:     "/",
    });
    return res;
  }

  // ── 5. Redirect login/register jika sudah login ───────────────────────────
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    const session = await getSession(req);
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/profile";
      return NextResponse.redirect(url);
    }
  }

  // ── 6. Language routing ───────────────────────────────────────────────────
  const langMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (langMatch) {
    const lang = langMatch[1];
    if (VALID_LANGS.includes(lang)) {
      const res = NextResponse.next();
      res.cookies.set("lang", lang, { path: "/", maxAge: 31536000 });
      return res;
    }
  }

  // ── 7. API key check untuk /api/v3/* (non-web) ────────────────────────────
  if (pathname.startsWith("/api/v3/") && !pathname.startsWith("/api/v3/proxy")) {
    const origin  = req.headers.get("origin") ?? "";
    const referer = req.headers.get("referer") ?? "";
    const isWeb   =
      req.headers.get("x-internal-request") === "1" ||
      origin.includes("snaptok.my.id")  || origin.includes("localhost") ||
      referer.includes("snaptok.my.id") || referer.includes("localhost");

    if (!isWeb) {
      const apikey = req.nextUrl.searchParams.get("apikey") ?? req.headers.get("x-api-key") ?? "";
      if (!apikey || !apikey.startsWith("snp-")) {
        return NextResponse.json(
          { author: "Snaptok", success: false, error: "API key diperlukan.", docs: "https://www.snaptok.my.id/docs" },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

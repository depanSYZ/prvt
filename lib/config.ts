// lib/config.ts
// ── Semua konfigurasi aplikasi ada di sini ──────────────────────────────────

// Deteksi environment — true jika berjalan di production
export const IS_PROD = process.env.NODE_ENV === "production";

export const SMTP = {
  host:   "smtp.gmail.com",
  port:   587,
  secure: false,
  user:   "otp.snaptok@gmail.com",
  pass:   "wnbe wvhw egll kizo", // Gmail App Password
  from:   "Snaptok <otp.snaptok@gmail.com>",
};

export const JWT = {
  secret:     "snaptok-jwt-secret-2026-defandryan",
  cookieName: "snaptok_session",
  maxAgeDays: 30,
};

// ── Cookie options ────────────────────────────────────────────────────────────
// secure: true  → hanya HTTPS (production)
// secure: false → HTTP juga boleh (localhost dev)
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   IS_PROD,          // ← kunci utama: false di localhost
  sameSite: "lax" as const,
  maxAge:   60 * 60 * 24 * 30, // 30 hari
  path:     "/",
};

// ── Cloudflare Turnstile ─────────────────────────────────────────────────────
export const TURNSTILE = {
  siteKey:    "0x4AAAAAACKBdWJuFtWnGLAP",
  secretKey:  "0x4AAAAAACKBdcQAW4QDpF_NXrbYPc6vmOo",
  skipVerify: !IS_PROD, // ← auto-skip di dev, aktif di production
};

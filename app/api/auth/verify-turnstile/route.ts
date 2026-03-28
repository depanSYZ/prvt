// app/api/auth/verify-turnstile/route.ts
// Server-side verification untuk Cloudflare Turnstile token
import { NextRequest, NextResponse } from "next/server";
import { TURNSTILE } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Token Turnstile tidak ditemukan." }, { status: 400 });

    // Skip verifikasi jika dikonfigurasi atau secretKey belum diisi
    const isDummyKey = !TURNSTILE.secretKey ||
      TURNSTILE.secretKey.includes("_SECRET") ||
      TURNSTILE.secretKey.length < 20;

    if (TURNSTILE.skipVerify || isDummyKey) {
      console.log("[turnstile] skip verify — dev mode atau key belum dikonfigurasi");
      return NextResponse.json({ author: "Snaptok", success: true });
    }

    // Ambil IP user untuk keamanan ekstra
    const ip =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "unknown";

    const formData = new FormData();
    formData.append("secret",   TURNSTILE.secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData }
    );

    const result = await res.json() as { success: boolean; "error-codes"?: string[] };

    if (!result.success) {
      console.error("[turnstile] verify failed:", result["error-codes"]);
      return NextResponse.json(
        { author: "Snaptok", success: false, error: "Verifikasi CAPTCHA gagal. Coba lagi." },
        { status: 400 }
      );
    }

    return NextResponse.json({ author: "Snaptok", success: true });
  } catch (err) {
    console.error("[turnstile] error:", err);
    return NextResponse.json(
      { author: "Snaptok", success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

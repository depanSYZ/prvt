// lib/config.ts
// ── Semua konfigurasi aplikasi ada di sini ──────────────────────────────────
// Ganti nilai di bawah sesuai kebutuhan, tidak perlu .env

export const SMTP = {
  host:   "smtp.gmail.com",
  port:   587,
  secure: false,
  user:   "otp.snaptok@gmail.com",
  pass:   "wnbe wvhw egll kizo", // Gmail: pakai App Password
  from:   "Snatok <defandryannn@gmail.com>",
};

export const JWT = {
  secret:     "snaptok-jwt-secret-2026-defandryan",
  cookieName: "snaptok_session",
  maxAgeDays: 30,
};

// ── Cloudflare Turnstile ─────────────────────────────────────────────────────
// Dapatkan key di: https://dash.cloudflare.com/?to=/:account/turnstile
// Site Key   → taruh di TURNSTILE.siteKey  (dipakai di frontend / widget)
// Secret Key → taruh di TURNSTILE.secretKey (dipakai di server untuk verify)
export const TURNSTILE = {
  siteKey:   "0x4AAAAAABkMd7De4OWpwm4W", // ← ganti dengan Site Key kamu
  secretKey: "0x4AAAAAABkMd7De4OWpwm4W_SECRET", // ← ganti dengan Secret Key kamu
  // Jika ingin skip verifikasi saat development, set skipVerify: true
  skipVerify: false,
};

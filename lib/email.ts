// lib/email.ts — kirim email via Nodemailer SMTP
import nodemailer from "nodemailer";
import { SMTP } from "./config";

const transporter = nodemailer.createTransport({
  host:   SMTP.host,
  port:   SMTP.port,
  secure: SMTP.secure,
  auth:   { user: SMTP.user, pass: SMTP.pass },
});

// ── Shared HTML wrapper ───────────────────────────────────────────────────────
function emailWrapper(content: string, year = new Date().getFullYear()): string {
  return `<!DOCTYPE html>
<html lang="id" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snaptok</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0 !important; padding: 0 !important; background-color: #f1f5f9; width: 100% !important; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-body { padding: 24px 20px !important; }
      .otp-code   { font-size: 36px !important; letter-spacing: 8px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f1f5f9;">
    <tr><td style="padding:40px 20px;" align="center">
      <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="600"
        style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        ${content}
      </table>
      <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="600">
        <tr><td style="padding:16px 0;" align="center">
          <p style="font-size:11px;color:#94a3b8;">
            Snaptok Developer Platform ·
            <a href="https://snaptok.my.id/privacy" style="color:#6366f1;text-decoration:none;">Privasi</a> ·
            <a href="https://snaptok.my.id/guide" style="color:#6366f1;text-decoration:none;">Syarat</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function emailHeader(gradient: string, emoji: string, label: string): string {
  return `<tr>
    <td style="background:${gradient};padding:32px 40px 28px;" class="email-body">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
        <td>
          <div style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">SNAP<span style="color:rgba(255,255,255,0.6);">TOK</span></div>
          <div style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.7);margin-top:3px;letter-spacing:0.5px;text-transform:uppercase;">${label}</div>
        </td>
        <td align="right" valign="middle">
          <div style="width:42px;height:42px;background:rgba(255,255,255,0.15);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:20px;">${emoji}</div>
        </td>
      </tr></table>
    </td>
  </tr>`;
}

function emailFooter(year: number): string {
  return `<tr>
    <td style="padding:0 40px;" class="email-body"><div style="height:1px;background:#f1f5f9;"></div></td>
  </tr>
  <tr>
    <td style="padding:20px 40px 28px;" class="email-body">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
        <td>
          <p style="margin:0;font-size:11px;color:#9ca3af;">Email otomatis — mohon tidak membalas.</p>
          <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">© ${year} <a href="https://snaptok.my.id" style="color:#6366f1;text-decoration:none;">snaptok.my.id</a></p>
        </td>
        <td align="right" valign="bottom">
          <div style="font-size:16px;font-weight:800;color:#e2e8f0;">SNAP<span style="color:#f1f5f9;">TOK</span></div>
        </td>
      </tr></table>
    </td>
  </tr>`;
}

function warningBox(text: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr><td style="background:#fef9ec;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
        <td width="20" valign="top" style="padding-right:8px;font-size:14px;">⚠️</td>
        <td><p style="margin:0;font-size:12px;color:#92400e;line-height:1.5;">${text}</p></td>
      </tr></table>
    </td></tr>
  </table>`;
}

// ── 1. OTP Email (Login & Register) ──────────────────────────────────────────
export async function sendOtpEmail(
  to: string, otp: string, type: "register" | "login"
): Promise<{ success: boolean; error?: string }> {
  const isRegister = type === "register";
  const subject    = isRegister ? "✅ Kode Verifikasi Registrasi Snaptok" : "🔐 Kode Verifikasi Login Snaptok";
  const year       = new Date().getFullYear();

  const content = `
    ${emailHeader(
      "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%)",
      isRegister ? "🎉" : "🔐",
      isRegister ? "Verifikasi Akun Baru" : "Konfirmasi Login"
    )}
    <tr><td style="padding:36px 40px 28px;" class="email-body">
      <h1 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#111827;">
        ${isRegister ? "Selamat Datang di Snaptok! 👋" : "Verifikasi Login Anda"}
      </h1>
      <p style="margin:0 0 28px;font-size:14px;color:#4b5563;line-height:1.7;">
        ${isRegister
          ? "Terima kasih telah mendaftar! Gunakan kode di bawah untuk menyelesaikan proses registrasi."
          : "Kami menerima permintaan login ke akun Snaptok Anda. Gunakan kode berikut untuk melanjutkan."}
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px;">
        <tr><td align="center" style="background:linear-gradient(135deg,#f8faff,#f0f4ff);border:2px solid #e0e7ff;border-radius:14px;padding:24px 20px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#6366f1;letter-spacing:1.5px;text-transform:uppercase;">Kode Verifikasi</p>
          <div class="otp-code" style="font-size:42px;font-weight:800;letter-spacing:12px;color:#111827;font-family:'Courier New',monospace;margin-left:12px;">${otp}</div>
          <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;">Berlaku <strong style="color:#6366f1;">10 menit</strong></p>
        </td></tr>
      </table>
      ${warningBox("Jangan bagikan kode ini kepada siapapun, termasuk tim Snaptok. Jika tidak merasa meminta kode ini, abaikan email ini.")}
    </td></tr>
    ${emailFooter(year)}`;

  try {
    await transporter.sendMail({ from: SMTP.from, to, subject, html: emailWrapper(content, year) });
    return { success: true };
  } catch (err) {
    console.error("[email] sendOtpEmail error:", err);
    return { success: false, error: String(err) };
  }
}

// ── 2. Login Baru dari Device/IP Baru ────────────────────────────────────────
export async function sendNewLoginEmail(
  to: string,
  info: { username: string; ip: string; userAgent: string; time: string }
): Promise<{ success: boolean; error?: string }> {
  const year    = new Date().getFullYear();
  const subject = "🔔 Login Baru Terdeteksi — Snaptok";

  const content = `
    ${emailHeader("linear-gradient(135deg,#f59e0b 0%,#d97706 100%)", "🔔", "Notifikasi Keamanan")}
    <tr><td style="padding:36px 40px 28px;" class="email-body">
      <h1 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#111827;">Login Baru Terdeteksi</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#4b5563;line-height:1.7;">
        Halo <strong>${info.username}</strong>, ada login baru ke akun Snaptok kamu dari perangkat berikut:
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px;">
        <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${[
              ["🕐 Waktu",    info.time],
              ["🌍 Alamat IP", info.ip],
              ["💻 Perangkat", info.userAgent.length > 60 ? info.userAgent.slice(0,60) + "…" : info.userAgent],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#6b7280;width:100px;">${label}</td>
                <td style="padding:6px 0;font-size:12px;color:#111827;font-weight:500;">${value}</td>
              </tr>`).join("")}
          </table>
        </td></tr>
      </table>
      ${warningBox("Jika ini bukan kamu, segera ganti password dan logout semua sesi di halaman profil.")}
    </td></tr>
    ${emailFooter(year)}`;

  try {
    await transporter.sendMail({ from: SMTP.from, to, subject, html: emailWrapper(content, year) });
    return { success: true };
  } catch (err) {
    console.error("[email] sendNewLoginEmail error:", err);
    return { success: false, error: String(err) };
  }
}

// ── 3. API Key Di-regenerate ──────────────────────────────────────────────────
export async function sendRegenKeyEmail(
  to: string,
  info: { username: string; ip: string; time: string }
): Promise<{ success: boolean; error?: string }> {
  const year    = new Date().getFullYear();
  const subject = "🔑 API Key Baru Dibuat — Snaptok";

  const content = `
    ${emailHeader("linear-gradient(135deg,#10b981 0%,#059669 100%)", "🔑", "API Key Diperbarui")}
    <tr><td style="padding:36px 40px 28px;" class="email-body">
      <h1 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#111827;">API Key Baru Dibuat</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#4b5563;line-height:1.7;">
        Halo <strong>${info.username}</strong>, API key akun Snaptok kamu baru saja di-regenerate. API key lama sudah tidak aktif.
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px;">
        <tr><td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${[
              ["🕐 Waktu",    info.time],
              ["🌍 Alamat IP", info.ip],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:5px 0;font-size:12px;color:#6b7280;width:100px;">${label}</td>
                <td style="padding:5px 0;font-size:12px;color:#111827;font-weight:500;">${value}</td>
              </tr>`).join("")}
          </table>
        </td></tr>
      </table>
      ${warningBox("Jika kamu tidak melakukan ini, segera amankan akun kamu dan hubungi support.")}
    </td></tr>
    ${emailFooter(year)}`;

  try {
    await transporter.sendMail({ from: SMTP.from, to, subject, html: emailWrapper(content, year) });
    return { success: true };
  } catch (err) {
    console.error("[email] sendRegenKeyEmail error:", err);
    return { success: false, error: String(err) };
  }
}

// ── 4. Weekly Summary API Usage ───────────────────────────────────────────────
export async function sendWeeklySummaryEmail(
  to: string,
  info: { username: string; weekRequests: number; weekSuccess: number; weekErrors: number; totalRequests: number; plan: string }
): Promise<{ success: boolean; error?: string }> {
  const year       = new Date().getFullYear();
  const subject    = "📊 Ringkasan Mingguan API — Snaptok";
  const successRate = info.weekRequests > 0
    ? Math.round((info.weekSuccess / info.weekRequests) * 100)
    : 0;

  const content = `
    ${emailHeader("linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)", "📊", "Ringkasan Mingguan")}
    <tr><td style="padding:36px 40px 28px;" class="email-body">
      <h1 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#111827;">Ringkasan 7 Hari Terakhir</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#4b5563;line-height:1.7;">
        Halo <strong>${info.username}</strong>, berikut ringkasan penggunaan API Snaptok kamu minggu ini:
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:20px;">
        <tr>
          ${[
            { label: "Total Request", value: info.weekRequests.toLocaleString(), color: "#6366f1", bg: "#f0f4ff" },
            { label: "Berhasil",      value: info.weekSuccess.toLocaleString(),  color: "#10b981", bg: "#f0fdf4" },
            { label: "Error",         value: info.weekErrors.toLocaleString(),   color: "#ef4444", bg: "#fef2f2" },
          ].map(s => `
            <td style="padding:0 4px;" align="center">
              <div style="background:${s.bg};border-radius:12px;padding:16px 12px;text-align:center;">
                <div style="font-size:24px;font-weight:800;color:${s.color};">${s.value}</div>
                <div style="font-size:11px;color:#6b7280;margin-top:4px;">${s.label}</div>
              </div>
            </td>`).join("")}
        </tr>
      </table>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px;">
        <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${[
              ["✅ Success Rate",      `${successRate}%`],
              ["📦 Plan",              info.plan === "pro" ? "Pro" : "Free"],
              ["📈 Total Sepanjang Waktu", info.totalRequests.toLocaleString() + " request"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:5px 0;font-size:12px;color:#6b7280;">${label}</td>
                <td style="padding:5px 0;font-size:12px;color:#111827;font-weight:600;text-align:right;">${value}</td>
              </tr>`).join("")}
          </table>
        </td></tr>
      </table>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td align="center">
          <a href="https://snaptok.my.id/auth/profile" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:13px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;">
            Lihat Dashboard Lengkap →
          </a>
        </td></tr>
      </table>
    </td></tr>
    ${emailFooter(year)}`;

  try {
    await transporter.sendMail({ from: SMTP.from, to, subject, html: emailWrapper(content, year) });
    return { success: true };
  } catch (err) {
    console.error("[email] sendWeeklySummaryEmail error:", err);
    return { success: false, error: String(err) };
  }
}

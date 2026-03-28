// lib/email.ts — kirim email via Nodemailer SMTP
import nodemailer from "nodemailer";
import { SMTP } from "./config";

const transporter = nodemailer.createTransport({
  host:   SMTP.host,
  port:   SMTP.port,
  secure: SMTP.secure,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
  },
});

export async function sendOtpEmail(
  to: string,
  otp: string,
  type: "register" | "login"
): Promise<{ success: boolean; error?: string }> {
  const isRegister = type === "register";
  const subject    = isRegister
    ? "✅ Kode Verifikasi Registrasi Snaptok"
    : "🔐 Kode Verifikasi Login Snaptok";

  const actionLabel = isRegister ? "Verifikasi Akun Baru" : "Konfirmasi Login";
  const introText   = isRegister
    ? "Terima kasih telah mendaftar di <strong>Snaptok</strong>! Gunakan kode di bawah untuk menyelesaikan proses registrasi akun Anda."
    : "Kami menerima permintaan login ke akun <strong>Snaptok</strong> Anda. Gunakan kode verifikasi berikut untuk melanjutkan.";
  const year = new Date().getFullYear();

  const html = `
<!DOCTYPE html>
<html lang="id" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${subject}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0 !important; padding: 0 !important; background-color: #f1f5f9; width: 100% !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    .email-container { max-width: 600px; margin: 0 auto; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-body-padding { padding: 24px 20px !important; }
      .otp-code { font-size: 36px !important; letter-spacing: 8px !important; }
      .footer-text { font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f1f5f9;">
    <tr>
      <td style="padding:40px 20px;" align="center">
        
        <!-- Email Container -->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);padding:36px 40px 32px;" class="email-body-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                      SNAP<span style="color:rgba(255,255,255,0.65);">TOK</span>
                    </div>
                    <div style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);margin-top:4px;letter-spacing:0.5px;text-transform:uppercase;">
                      ${actionLabel}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.15);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;">
                      ${isRegister ? "🎉" : "🔐"}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;" class="email-body-padding">
              
              <!-- Greeting -->
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
                ${isRegister ? "Selamat Datang di Snaptok! 👋" : "Verifikasi Login Anda"}
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#4b5563;line-height:1.7;">
                ${introText}
              </p>

              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="background:linear-gradient(135deg,#f8faff 0%,#f0f4ff 100%);border:2px solid #e0e7ff;border-radius:14px;padding:28px 20px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#6366f1;letter-spacing:1.5px;text-transform:uppercase;">
                      Kode Verifikasi Anda
                    </p>
                    <div class="otp-code" style="font-size:44px;font-weight:800;letter-spacing:12px;color:#111827;font-family:'Courier New',Courier,monospace;line-height:1.2;margin-left:12px;">
                      ${otp}
                    </div>
                    <p style="margin:10px 0 0;font-size:12px;color:#9ca3af;">
                      Berlaku selama <strong style="color:#6366f1;">10 menit</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background:#fef9ec;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="24" valign="top" style="padding-right:10px;">
                          <span style="font-size:16px;">⚠️</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                            <strong>Penting:</strong> Jangan bagikan kode ini kepada siapapun, termasuk tim Snaptok. Jika Anda tidak meminta kode ini, abaikan email ini.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;" class="email-body-padding">
              <div style="height:1px;background:#f1f5f9;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;" class="email-body-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                      Email ini dikirim secara otomatis oleh sistem Snaptok. Mohon tidak membalas email ini.
                    </p>
                    <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
                      © ${year} <a href="https://snaptok.my.id" style="color:#6366f1;text-decoration:none;font-weight:500;">snaptok.my.id</a> — Platform Video Pendek Masa Kini
                    </p>
                  </td>
                  <td align="right" valign="bottom">
                    <div style="font-size:18px;font-weight:800;color:#d1d5db;letter-spacing:-0.5px;">
                      SNAP<span style="color:#e5e7eb;">TOK</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Email Container -->

        <!-- Sub-footer -->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="600">
          <tr>
            <td style="padding:16px 0;" align="center">
              <p style="font-size:11px;color:#94a3b8;" class="footer-text">
                Snaptok Developer Platform · <a href="https://snaptok.my.id/privacy" style="color:#6366f1;text-decoration:none;">Kebijakan Privasi</a> · <a href="https://snaptok.my.id/guide" style="color:#6366f1;text-decoration:none;">Syarat & Ketentuan</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: SMTP.from,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error("[email] sendMail error:", err);
    return { success: false, error: String(err) };
  }
}

// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { writeUserFile, readUserFile } from "@/lib/pterodactyl";
import { createSession, addToApiKeyIndex, COOKIE_NAME } from "@/lib/auth";
import { createSessionMeta } from "@/lib/session-store";
import { sendNewLoginEmail } from "@/lib/email";
import { COOKIE_OPTIONS } from "@/lib/config";
import type { User, SessionUser } from "@/lib/auth";

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      token: string; otp: string;
      fingerprintHash?: string; deviceId?: string;
    };
    const { token, otp } = body;

    if (!token || !otp)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Token dan kode wajib diisi." }, { status: 400 });

    const result = await verifyOtp(token, otp);
    if (!result.valid)
      return NextResponse.json({ author: "Snaptok", success: false, error: result.error }, { status: 400 });

    const { record } = result;
    const ip        = getClientIP(req);
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const timeStr   = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long", timeStyle: "short" }) + " WIB";

    // ── REGISTER ─────────────────────────────────────────────────────────────
    if (record.type === "register") {
      if (!record.pending)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Data pendaftaran tidak ditemukan." }, { status: 400 });

      const { username, passwordHash, apikey } = record.pending;
      const existing = await readUserFile(`${username}.json`);
      if (existing)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Username sudah dipakai." }, { status: 400 });

      const user: User = {
        username, email: record.email, password: passwordHash,
        avatar: "", apikey, created: new Date().toISOString(), plan: "free", requests: 0,
      };

      const saved = await writeUserFile(`${username}.json`, user as unknown as Record<string, unknown>);
      if (!saved)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal menyimpan akun. Coba lagi." }, { status: 500 });

      await addToApiKeyIndex(apikey, username);

      const emailIndex = (await readUserFile("_email_index.json") as Record<string, string> | null) ?? {};
      emailIndex[record.email] = username;
      await writeUserFile("_email_index.json", emailIndex);

      const sessionUser: SessionUser = {
        username: user.username, email: user.email,
        avatar: user.avatar, apikey: user.apikey, plan: user.plan,
      };
      const sessionToken = await createSession(sessionUser);

      await createSessionMeta(sessionToken, {
        username: user.username,
        fingerprintHash: body.fingerprintHash ?? "unknown",
        deviceId: body.deviceId ?? "unknown",
        ip, userAgent,
      });

      const res = NextResponse.json({ author: "Snaptok", success: true, user: sessionUser });
      res.cookies.set(COOKIE_NAME, sessionToken, COOKIE_OPTIONS); // ← pakai COOKIE_OPTIONS
      return res;
    }

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    if (record.type === "login") {
      const emailIndex = (await readUserFile("_email_index.json") as Record<string, string> | null) ?? {};
      const username   = emailIndex[record.email];
      if (!username)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Data user tidak ditemukan. Coba login ulang." }, { status: 400 });

      const data = await readUserFile(`${username}.json`) as User | null;
      if (!data)
        return NextResponse.json({ author: "Snaptok", success: false, error: "User tidak ditemukan." }, { status: 400 });

      const sessionUser: SessionUser = {
        username: data.username, email: data.email,
        avatar: data.avatar, apikey: data.apikey, plan: data.plan,
      };
      const sessionToken = await createSession(sessionUser);

      await createSessionMeta(sessionToken, {
        username: data.username,
        fingerprintHash: body.fingerprintHash ?? "unknown",
        deviceId: body.deviceId ?? "unknown",
        ip, userAgent,
      });

      // Notifikasi email login baru (non-blocking)
      sendNewLoginEmail(data.email, { username: data.username, ip, userAgent, time: timeStr }).catch(() => {});

      const res = NextResponse.json({ author: "Snaptok", success: true, user: sessionUser });
      res.cookies.set(COOKIE_NAME, sessionToken, COOKIE_OPTIONS); // ← pakai COOKIE_OPTIONS
      return res;
    }

    return NextResponse.json({ author: "Snaptok", success: false, error: "Type tidak valid." }, { status: 400 });
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json({ author: "Snaptok", success: false, error: "Server error." }, { status: 500 });
  }
}

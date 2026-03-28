// app/api/auth/sessions/route.ts
// GET  → list semua session aktif user
// DELETE → revoke satu session (by tokenHash) atau semua (body: { all: true })
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, COOKIE_NAME } from "@/lib/auth";
import { listUserSessions, deleteSessionMeta, deleteAllUserSessions } from "@/lib/session-store";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  const sessions = await listUserSessions(user.username);

  // Tandai session yang sedang aktif (token sama dengan cookie)
  const currentToken = req.cookies.get(COOKIE_NAME)?.value ?? "";

  const result = sessions.map(s => ({
    fingerprintHash: s.fingerprintHash,
    deviceId:        s.deviceId,
    ip:              s.ip,
    userAgent:       s.userAgent,
    createdAt:       s.createdAt,
    lastActiveAt:    s.lastActiveAt,
    isCurrent:       s.sessionToken === currentToken,
    // token tidak dikirim ke client
  }));

  return NextResponse.json({ author: "Snaptok", success: true, sessions: result, count: result.length });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({})) as { all?: boolean; deviceId?: string };

  if (body.all) {
    await deleteAllUserSessions(user.username);
    // Hapus cookie session saat ini juga
    const res = NextResponse.json({ author: "Snaptok", success: true, message: "Semua session dihapus." });
    res.cookies.delete(COOKIE_NAME);
    return res;
  }

  // Revoke session berdasarkan deviceId
  if (body.deviceId) {
    const sessions = await listUserSessions(user.username);
    const target = sessions.find(s => s.deviceId === body.deviceId);
    if (!target)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Session tidak ditemukan." }, { status: 404 });
    await deleteSessionMeta(target.sessionToken);
    return NextResponse.json({ author: "Snaptok", success: true, message: "Session dihapus." });
  }

  return NextResponse.json({ author: "Snaptok", success: false, error: "Tidak ada target yang ditentukan." }, { status: 400 });
}

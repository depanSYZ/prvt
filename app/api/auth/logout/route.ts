import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";
import { deleteSessionMeta } from "@/lib/session-store";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token) {
    // Hapus session metadata dari server
    await deleteSessionMeta(token).catch(() => {});
  }
  const res = NextResponse.json({ author: "Snaptok", success: true, message: "Berhasil logout." });
  res.cookies.delete(COOKIE_NAME);
  return res;
}

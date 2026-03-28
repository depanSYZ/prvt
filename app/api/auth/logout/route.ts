import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";
import { COOKIE_OPTIONS } from "@/lib/config";
import { deleteSessionMeta } from "@/lib/session-store";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token) await deleteSessionMeta(token).catch(() => {});
  const res = NextResponse.json({ author: "Snaptok", success: true, message: "Berhasil logout." });
  res.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 }); // expire cookie
  return res;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token) await deleteSessionMeta(token).catch(() => {});

  const { searchParams } = new URL(req.url);
  const redirectTo = searchParams.get("from") ?? "/";

  const res = NextResponse.redirect(new URL(redirectTo, req.url));
  res.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return res;
}

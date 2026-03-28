import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ author: "Snaptok", success: true, message: "Berhasil logout." });
  res.cookies.delete(COOKIE_NAME);
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, updateUser, hashPassword, verifyPassword, COOKIE_NAME } from "@/lib/auth";
import { readUserFile, deleteUserFile } from "@/lib/pterodactyl";
import type { User } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    // ── Delete Account ──────────────────────────────────────────────────────
    if (body.deleteAccount === true) {
      const { confirmPassword } = body as { confirmPassword: string };
      if (!confirmPassword)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Password konfirmasi wajib diisi." }, { status: 400 });

      const data = await readUserFile(`${user.username.toLowerCase()}.json`) as User | null;
      if (!data)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Akun tidak ditemukan." }, { status: 404 });

      const valid = await verifyPassword(confirmPassword, data.password);
      if (!valid)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Password tidak benar." }, { status: 401 });

      const deleted = await deleteUserFile(`${user.username.toLowerCase()}.json`);
      if (!deleted)
        return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal menghapus akun. Coba lagi." }, { status: 500 });

      const res = NextResponse.json({ author: "Snaptok", success: true, message: "Akun berhasil dihapus." });
      res.cookies.delete(COOKIE_NAME);
      return res;
    }

    // ── Update Profile ──────────────────────────────────────────────────────
    const allowed: Record<string, unknown> = {};

    if (body.email)    allowed.email    = body.email;
    if (body.avatar)   allowed.avatar   = body.avatar;
    if (body.password) allowed.password = await hashPassword(body.password);

    if (Object.keys(allowed).length === 0)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Tidak ada yang diperbarui." }, { status: 400 });

    const ok = await updateUser(user.username, allowed as Parameters<typeof updateUser>[1]);
    if (!ok)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal menyimpan perubahan." }, { status: 500 });

    return NextResponse.json({ author: "Snaptok", success: true });
  } catch {
    return NextResponse.json({ author: "Snaptok", success: false, error: "Server error." }, { status: 500 });
  }
}

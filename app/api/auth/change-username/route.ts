// app/api/auth/change-username/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, verifyPassword, createSession, COOKIE_NAME } from "@/lib/auth";
import { readUserFile, writeUserFile, deleteUserFile } from "@/lib/pterodactyl";
import type { User } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { newUsername, confirmPassword } = await req.json() as { newUsername: string; confirmPassword: string };

    if (!newUsername || !confirmPassword)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Semua field wajib diisi." }, { status: 400 });

    if (newUsername.length < 3 || newUsername.length > 20)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Username harus 3-20 karakter." }, { status: 400 });

    if (!/^[a-zA-Z0-9_]+$/.test(newUsername))
      return NextResponse.json({ author: "Snaptok", success: false, error: "Username hanya huruf, angka, dan underscore." }, { status: 400 });

    if (newUsername.toLowerCase() === user.username.toLowerCase())
      return NextResponse.json({ author: "Snaptok", success: false, error: "Username sama dengan yang sekarang." }, { status: 400 });

    // Cek username baru belum dipakai
    const taken = await readUserFile(`${newUsername.toLowerCase()}.json`);
    if (taken)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Username sudah dipakai." }, { status: 400 });

    // Verifikasi password
    const data = await readUserFile(`${user.username}.json`) as User | null;
    if (!data)
      return NextResponse.json({ author: "Snaptok", success: false, error: "User tidak ditemukan." }, { status: 404 });

    const valid = await verifyPassword(confirmPassword, data.password);
    if (!valid)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Password tidak benar." }, { status: 401 });

    // Salin data ke file baru, update username
    const newData: User = { ...data, username: newUsername.toLowerCase() };
    const saved = await writeUserFile(`${newUsername.toLowerCase()}.json`, newData as unknown as Record<string, unknown>);
    if (!saved)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal menyimpan username baru." }, { status: 500 });

    // Update email index
    const emailIndex = (await readUserFile("_email_index.json") as Record<string, string> | null) ?? {};
    emailIndex[data.email] = newUsername.toLowerCase();
    await writeUserFile("_email_index.json", emailIndex);

    // Update API key index
    const keyIndex = (await readUserFile("_index.json") as Record<string, string> | null) ?? {};
    keyIndex[data.apikey] = newUsername.toLowerCase();
    await writeUserFile("_index.json", keyIndex);

    // Hapus file lama
    await deleteUserFile(`${user.username}.json`);

    // Buat session baru dengan username baru
    const newSession = await createSession({
      username: newData.username,
      email:    newData.email,
      avatar:   newData.avatar,
      apikey:   newData.apikey,
      plan:     newData.plan,
    });

    const res = NextResponse.json({ author: "Snaptok", success: true, newUsername: newData.username });
    res.cookies.set(COOKIE_NAME, newSession, {
      httpOnly: true, secure: true, sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ author: "Snaptok", success: false, error: "Server error." }, { status: 500 });
  }
}

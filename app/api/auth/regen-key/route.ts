// app/api/auth/regen-key/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, generateApiKey, updateUser } from "@/lib/auth";
import { readUserFile, writeUserFile } from "@/lib/pterodactyl";
import { sendRegenKeyEmail } from "@/lib/email";
import type { User } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const newKey = generateApiKey();
    const index  = (await readUserFile("_index.json") as Record<string, string> | null) ?? {};
    for (const [k, v] of Object.entries(index)) {
      if (v === user.username) { delete index[k]; break; }
    }
    index[newKey] = user.username;
    await writeUserFile("_index.json", index);
    await updateUser(user.username, { apikey: newKey });

    // Kirim email notifikasi regen key
    const data = await readUserFile(`${user.username}.json`) as User | null;
    if (data) {
      const ip      = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
      const timeStr = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long", timeStyle: "short" }) + " WIB";
      sendRegenKeyEmail(data.email, { username: data.username, ip, time: timeStr }).catch(() => {});
    }

    return NextResponse.json({ author: "Snaptok", success: true, apikey: newKey });
  } catch {
    return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal generate key baru." }, { status: 500 });
  }
}

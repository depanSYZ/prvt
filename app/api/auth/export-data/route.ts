// app/api/auth/export-data/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readUserFile } from "@/lib/pterodactyl";
import type { User } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  const data = await readUserFile(`${user.username}.json`) as User | null;
  if (!data) return NextResponse.json({ author: "Snaptok", success: false, error: "Data tidak ditemukan." }, { status: 404 });

  const analytics = await readUserFile(`_analytics_${user.username}.json`).catch(() => null);

  const exportData = {
    exportedAt: new Date().toISOString(),
    platform:   "Snaptok API Platform",
    account: {
      username:  data.username,
      email:     data.email,
      plan:      data.plan,
      createdAt: data.created,
      requests:  data.requests,
      // password & apikey tidak disertakan untuk keamanan
    },
    analytics: analytics ?? null,
    notice: "Data ini diekspor sesuai kebijakan privasi Snaptok. API key dan password tidak disertakan.",
  };

  // Kembalikan sebagai file JSON yang bisa didownload
  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type":        "application/json",
      "Content-Disposition": `attachment; filename="snaptok-data-${user.username}-${new Date().toISOString().slice(0,10)}.json"`,
    },
  });
}

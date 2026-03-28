// app/api/auth/send-weekly-summary/route.ts
// Dipanggil secara manual atau via cron job eksternal
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readUserFile } from "@/lib/pterodactyl";
import { sendWeeklySummaryEmail } from "@/lib/email";
import type { User } from "@/lib/auth";

interface DayUsage { date: string; requests: number; success: number; errors: number; }
interface AnalyticsData { days: DayUsage[]; }

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const data      = await readUserFile(`${user.username}.json`) as User | null;
    const analytics = await readUserFile(`_analytics_${user.username}.json`) as AnalyticsData | null;

    if (!data)
      return NextResponse.json({ author: "Snaptok", success: false, error: "Data user tidak ditemukan." }, { status: 404 });

    // Hitung 7 hari terakhir
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const weekDays = (analytics?.days ?? []).filter(d => d.date >= sevenDaysAgo);
    const weekRequests = weekDays.reduce((s, d) => s + d.requests, 0);
    const weekSuccess  = weekDays.reduce((s, d) => s + d.success,  0);
    const weekErrors   = weekDays.reduce((s, d) => s + d.errors,   0);
    const totalRequests = (analytics?.days ?? []).reduce((s, d) => s + d.requests, 0);

    await sendWeeklySummaryEmail(data.email, {
      username: data.username, plan: data.plan,
      weekRequests, weekSuccess, weekErrors, totalRequests,
    });

    return NextResponse.json({ author: "Snaptok", success: true, message: "Weekly summary terkirim." });
  } catch {
    return NextResponse.json({ author: "Snaptok", success: false, error: "Gagal mengirim summary." }, { status: 500 });
  }
}

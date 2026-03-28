// app/api/auth/analytics/route.ts
// Simpan & ambil usage history harian user
// Key: _analytics_{username}.json
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readUserFile, writeUserFile } from "@/lib/pterodactyl";

export interface DayUsage {
  date:     string; // YYYY-MM-DD
  requests: number;
  success:  number;
  errors:   number;
}

export interface AnalyticsData {
  username: string;
  days:     DayUsage[]; // 30 hari terakhir
  updatedAt: string;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function analyticsFile(username: string): string {
  return `_analytics_${username}.json`;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  const raw = await readUserFile(analyticsFile(user.username)) as AnalyticsData | null;
  if (!raw) {
    return NextResponse.json({ author: "Snaptok", success: true, days: [], totalRequests: 0, totalSuccess: 0, totalErrors: 0 });
  }

  const totalRequests = raw.days.reduce((s, d) => s + d.requests, 0);
  const totalSuccess  = raw.days.reduce((s, d) => s + d.success,  0);
  const totalErrors   = raw.days.reduce((s, d) => s + d.errors,   0);

  return NextResponse.json({
    author: "Snaptok", success: true,
    days: raw.days.slice(-30),
    totalRequests, totalSuccess, totalErrors,
    updatedAt: raw.updatedAt,
  });
}

// Dipanggil dari download/search API setiap kali ada request
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ author: "Snaptok", success: false, error: "Unauthorized" }, { status: 401 });

  const { success: isSuccess = true } = await req.json().catch(() => ({})) as { success?: boolean };
  const today = todayKey();

  const raw = (await readUserFile(analyticsFile(user.username)) as AnalyticsData | null) ?? {
    username: user.username,
    days: [],
    updatedAt: new Date().toISOString(),
  };

  const existing = raw.days.find(d => d.date === today);
  if (existing) {
    existing.requests++;
    if (isSuccess) existing.success++; else existing.errors++;
  } else {
    raw.days.push({ date: today, requests: 1, success: isSuccess ? 1 : 0, errors: isSuccess ? 0 : 1 });
  }

  // Simpan hanya 30 hari terakhir
  raw.days = raw.days.slice(-30);
  raw.updatedAt = new Date().toISOString();

  await writeUserFile(analyticsFile(user.username), raw as unknown as Record<string, unknown>);
  return NextResponse.json({ author: "Snaptok", success: true });
}

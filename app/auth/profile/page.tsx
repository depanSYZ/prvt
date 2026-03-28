"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlayCircle, Copy, Check, RefreshCw, LogOut, Loader2,
  Key, User, Mail, Activity, Shield, Camera, Trash2, AlertTriangle,
  Monitor, Smartphone, Globe, Clock, LogOut as LogOutIcon,
  ShieldCheck, Download, AtSign, TrendingUp, BarChart3, Zap,
  Send,
} from "lucide-react";
import Image from "next/image";
import { ToastContainer, useToast } from "@/components/toast-notification";

// ── Types ─────────────────────────────────────────────────────────────────────
interface UserData {
  username: string; email: string; avatar: string;
  apikey: string; plan: string; requests: number; created: string;
}
interface DayUsage { date: string; requests: number; success: number; errors: number; }
interface SessionInfo {
  fingerprintHash: string; deviceId: string; ip: string;
  userAgent: string; createdAt: string; lastActiveAt: string; isCurrent: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDeviceIcon(ua: string) { return ua.toLowerCase().match(/mobile|android|iphone/) ? Smartphone : Monitor; }
function getDeviceLabel(ua: string): string {
  const u = ua.toLowerCase();
  if (u.includes("chrome") && !u.includes("edg")) return "Chrome";
  if (u.includes("firefox")) return "Firefox";
  if (u.includes("safari") && !u.includes("chrome")) return "Safari";
  if (u.includes("edg")) return "Edge";
  return "Browser";
}
function getOSLabel(ua: string): string {
  const u = ua.toLowerCase();
  if (u.includes("windows")) return "Windows";
  if (u.includes("mac os")) return "macOS";
  if (u.includes("android")) return "Android";
  if (u.includes("iphone") || u.includes("ipad")) return "iOS";
  if (u.includes("linux")) return "Linux";
  return "Unknown";
}
function formatRel(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  const m = Math.floor(d / 60000), h = Math.floor(d / 3600000), dy = Math.floor(d / 86400000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m} mnt lalu`;
  if (h < 24) return `${h} jam lalu`;
  return `${dy} hari lalu`;
}

// ── Mini Bar Chart ────────────────────────────────────────────────────────────
function BarChart({ days }: { days: DayUsage[] }) {
  const last14 = [...Array(14)].map((_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000).toISOString().slice(0, 10);
    return days.find(x => x.date === d) ?? { date: d, requests: 0, success: 0, errors: 0 };
  });
  const max = Math.max(...last14.map(d => d.requests), 1);

  return (
    <div className="flex items-end gap-1 h-16 w-full">
      {last14.map((d, i) => {
        const h = Math.max((d.requests / max) * 100, d.requests > 0 ? 8 : 2);
        const isToday = d.date === new Date().toISOString().slice(0, 10);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
            <div
              className={`w-full rounded-sm transition-all ${isToday ? "bg-primary" : "bg-primary/30 group-hover:bg-primary/60"}`}
              style={{ height: `${h}%` }}
            />
            {/* Tooltip */}
            {d.requests > 0 && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-10">
                <p className="font-medium">{d.date.slice(5)}</p>
                <p className="text-muted-foreground">{d.requests} req</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Active Sessions Component ─────────────────────────────────────────────────
function ActiveSessions({ onLogoutAll }: { onLogoutAll: () => void }) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/auth/sessions").then(r => r.json())
      .then(j => { if (j.success) setSessions(j.sessions); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const revoke = async (deviceId: string) => {
    setRevoking(deviceId);
    await fetch("/api/auth/sessions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deviceId }) });
    load(); setRevoking(null);
  };

  const revokeAll = async () => {
    if (!confirm("Logout dari semua perangkat? Kamu akan keluar juga.")) return;
    await fetch("/api/auth/sessions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ all: true }) });
    onLogoutAll();
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5"><ShieldCheck className="h-4 w-4 text-primary" /></div>
          <span className="font-semibold text-sm">Sesi Aktif</span>
          {!loading && <span className="text-xs text-muted-foreground">({sessions.length})</span>}
        </div>
        {sessions.length > 1 && (
          <Button variant="ghost" size="sm" onClick={revokeAll} className="text-xs text-destructive hover:text-destructive gap-1.5">
            <LogOutIcon className="h-3 w-3" />Logout Semua
          </Button>
        )}
      </div>
      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-6 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : sessions.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Tidak ada sesi aktif.</div>
        ) : sessions.map((s, i) => {
          const DevIcon = getDeviceIcon(s.userAgent);
          return (
            <div key={i} className="px-6 py-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.isCurrent ? "bg-primary/10 border border-primary/20" : "bg-muted border border-border"}`}>
                <DevIcon className={`h-4 w-4 ${s.isCurrent ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{getDeviceLabel(s.userAgent)} · {getOSLabel(s.userAgent)}</span>
                  {s.isCurrent && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Sesi ini
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Globe className="h-3 w-3" />{s.ip}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{formatRel(s.lastActiveAt)}</span>
                  <span className="text-xs text-muted-foreground/50 font-mono">FP:{s.fingerprintHash.slice(0,8)}…</span>
                </div>
              </div>
              {!s.isCurrent && (
                <Button variant="ghost" size="sm" onClick={() => revoke(s.deviceId)} disabled={revoking === s.deviceId}
                  className="flex-shrink-0 text-xs text-muted-foreground hover:text-destructive gap-1">
                  {revoking === s.deviceId ? <Loader2 className="h-3 w-3 animate-spin" /> : <LogOutIcon className="h-3 w-3" />}Hapus
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Profile Page ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [user,    setUser]    = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied,  setCopied]  = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [regen,   setRegen]   = useState(false);

  const [editEmail,   setEditEmail]   = useState("");
  const [editPass,    setEditPass]    = useState("");

  // Change username
  const [showUsernameModal,  setShowUsernameModal]  = useState(false);
  const [newUsername,        setNewUsername]         = useState("");
  const [usernamePass,       setUsernamePass]        = useState("");
  const [usernameLoading,    setUsernameLoading]     = useState(false);
  const [usernameError,      setUsernameError]       = useState("");

  // Delete account
  const [showDeleteModal,    setShowDeleteModal]    = useState(false);
  const [deleteConfirmPass,  setDeleteConfirmPass]  = useState("");
  const [deleteLoading,      setDeleteLoading]      = useState(false);
  const [deleteError,        setDeleteError]        = useState("");

  // Analytics
  const [analytics, setAnalytics] = useState<{ days: DayUsage[]; totalRequests: number; totalSuccess: number; totalErrors: number } | null>(null);
  const [sendingSummary, setSendingSummary] = useState(false);

  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(j => {
      if (j.success) { setUser(j.user); setEditEmail(j.user.email); }
      else router.push("/auth/login");
    }).finally(() => setLoading(false));

    fetch("/api/auth/analytics").then(r => r.json()).then(j => {
      if (j.success) setAnalytics({ days: j.days, totalRequests: j.totalRequests, totalSuccess: j.totalSuccess, totalErrors: j.totalErrors });
    }).catch(() => {});
  }, [router]);

  const copyKey = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.apikey);
    setCopied(true); addToast("API key disalin ke clipboard.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { addToast("Ukuran foto maksimal 2MB.", "error"); return; }
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setSaving(true);
      const res  = await fetch("/api/auth/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ avatar: base64 }) });
      const json = await res.json();
      if (json.success) { setUser(u => u ? { ...u, avatar: base64 } : u); addToast("Foto profil diperbarui!", "success"); }
      else addToast(json.error ?? "Gagal update foto.", "error");
      setSaving(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const body: Record<string, string> = {};
    if (editEmail !== user?.email) body.email = editEmail;
    if (editPass) body.password = editPass;
    if (!Object.keys(body).length) { setSaving(false); addToast("Tidak ada perubahan.", "success"); return; }
    const res  = await fetch("/api/auth/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = await res.json();
    if (json.success) { setUser(u => u ? { ...u, ...body } : u); addToast("Profil diperbarui!", "success"); setEditPass(""); }
    else addToast(json.error ?? "Gagal update profil.", "error");
    setSaving(false);
  };

  const handleRegenKey = async () => {
    if (!confirm("Yakin mau generate ulang API key? Key lama tidak aktif.")) return;
    setRegen(true);
    const res  = await fetch("/api/auth/regen-key", { method: "POST" });
    const json = await res.json();
    if (json.success) { setUser(u => u ? { ...u, apikey: json.apikey } : u); addToast("API key baru berhasil dibuat! Email notifikasi dikirim.", "success"); }
    else addToast(json.error ?? "Gagal generate key.", "error");
    setRegen(false);
  };

  const handleLogout = async () => {
    addToast("Kamu berhasil logout dari Snaptok!", "logout");
    setTimeout(async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); router.refresh(); }, 1200);
  };

  const handleChangeUsername = async () => {
    if (!newUsername || !usernamePass) { setUsernameError("Semua field wajib diisi."); return; }
    setUsernameLoading(true); setUsernameError("");
    const res  = await fetch("/api/auth/change-username", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ newUsername, confirmPassword: usernamePass }) });
    const json = await res.json();
    if (json.success) {
      setUser(u => u ? { ...u, username: json.newUsername } : u);
      setShowUsernameModal(false); setNewUsername(""); setUsernamePass("");
      addToast(`Username berhasil diubah ke @${json.newUsername}!`, "success");
    } else { setUsernameError(json.error ?? "Gagal mengubah username."); }
    setUsernameLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirmPass) { setDeleteError("Masukkan password konfirmasi."); return; }
    setDeleteLoading(true); setDeleteError("");
    const res  = await fetch("/api/auth/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deleteAccount: true, confirmPassword: deleteConfirmPass }) });
    const json = await res.json();
    if (!json.success) { setDeleteError(json.error ?? "Gagal. Periksa password."); setDeleteLoading(false); return; }
    setShowDeleteModal(false);
    addToast("Akun berhasil dihapus. Semua data dihapus permanen.", "success");
    setTimeout(async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); router.refresh(); }, 1800);
  };

  const handleExportData = () => {
    window.open("/api/auth/export-data", "_blank");
    addToast("Data kamu sedang diunduh.", "success");
  };

  const handleSendWeeklySummary = async () => {
    setSendingSummary(true);
    const res  = await fetch("/api/auth/send-weekly-summary", { method: "POST" });
    const json = await res.json();
    if (json.success) addToast("Weekly summary dikirim ke email kamu!", "success");
    else addToast(json.error ?? "Gagal mengirim summary.", "error");
    setSendingSummary(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!user) return null;

  const week7Days = analytics?.days.filter(d => d.date >= new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)) ?? [];
  const weekTotal = week7Days.reduce((s, d) => s + d.requests, 0);
  const successRate = analytics && analytics.totalRequests > 0
    ? Math.round((analytics.totalSuccess / analytics.totalRequests) * 100) : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Change Username Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AtSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Ganti Username</h3>
                  <p className="text-sm text-muted-foreground">Username saat ini: @{user.username}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Username Baru</label>
                  <Input value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="min 3 karakter, huruf/angka/_" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Konfirmasi Password</label>
                  <Input type="password" value={usernamePass} onChange={e => setUsernamePass(e.target.value)} placeholder="Password kamu" className="rounded-xl" />
                </div>
                {usernameError && <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3"><p className="text-sm text-destructive">{usernameError}</p></div>}
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => { setShowUsernameModal(false); setNewUsername(""); setUsernamePass(""); setUsernameError(""); }} disabled={usernameLoading}>Batal</Button>
              <Button className="flex-1 rounded-xl h-11 gap-2" onClick={handleChangeUsername} disabled={usernameLoading || !newUsername || !usernamePass}>
                {usernameLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan…</> : <><Check className="h-4 w-4" />Simpan</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0"><AlertTriangle className="h-5 w-5 text-red-500" /></div>
                <div><h3 className="font-bold text-lg">Hapus Akun</h3><p className="text-sm text-muted-foreground">Tindakan ini tidak dapat dibatalkan</p></div>
              </div>
              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 mb-4">
                <p className="text-sm text-red-600 dark:text-red-400 leading-relaxed"><strong>Perhatian!</strong> Semua data kamu akan dihapus permanen — API key, histori, dan profil.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Konfirmasi Password</label>
                <Input type="password" value={deleteConfirmPass} onChange={e => setDeleteConfirmPass(e.target.value)} placeholder="Masukkan password kamu" className="rounded-xl" />
              </div>
              {deleteError && <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 mt-3"><p className="text-sm text-destructive">{deleteError}</p></div>}
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => { setShowDeleteModal(false); setDeleteConfirmPass(""); setDeleteError(""); }} disabled={deleteLoading}>Batal</Button>
              <Button variant="destructive" className="flex-1 rounded-xl h-11 gap-2" onClick={handleDeleteAccount} disabled={deleteLoading || !deleteConfirmPass}>
                {deleteLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Menghapus…</> : <><Trash2 className="h-4 w-4" />Hapus Akun</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <PlayCircle className="h-7 w-7 text-primary" />
            <span>Snap<span className="text-muted-foreground">-Tok</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/docs"><Button variant="outline" size="sm" className="gap-2"><Key className="h-3.5 w-3.5" />API Docs</Button></Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground"><LogOut className="h-4 w-4" />Logout</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-muted overflow-hidden ring-2 ring-primary/20 shadow-xl">
                {user.avatar
                  ? <Image src={user.avatar} alt={user.username} width={112} height={112} className="w-full h-full object-cover" unoptimized />
                  : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"><User className="h-12 w-12 text-primary" /></div>}
              </div>
              <button onClick={() => fileRef.current?.click()} className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <button onClick={() => { setShowUsernameModal(true); setNewUsername(""); setUsernamePass(""); setUsernameError(""); }}
                  className="text-muted-foreground hover:text-primary transition-colors" title="Ganti username">
                  <AtSign className="h-4 w-4" />
                </button>
              </div>
              <p className="text-muted-foreground text-sm mt-0.5">{user.email}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-semibold ${user.plan === "pro" ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" : "bg-primary/5 border-primary/20 text-primary"}`}>
                  <Shield className="h-3 w-3" />{user.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                  Bergabung {new Date(user.created).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-5 rounded-2xl border border-border bg-background/80 backdrop-blur px-6 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{user.requests.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Activity className="h-3 w-3" />Total Req</p>
              </div>
              {analytics && (
                <div className="text-center border-l border-border pl-5">
                  <p className="text-2xl font-bold text-green-500">{successRate}%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Success Rate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-5">

        {/* ── Analytics Dashboard ── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5"><BarChart3 className="h-4 w-4 text-primary" /></div>
              <span className="font-semibold text-sm">Dashboard Penggunaan API</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSendWeeklySummary} disabled={sendingSummary} className="text-xs gap-1.5 text-muted-foreground">
                {sendingSummary ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}Weekly Email
              </Button>
            </div>
          </div>
          <div className="p-6 space-y-5">
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Request",  value: analytics?.totalRequests ?? 0,  icon: Zap,       color: "text-primary",     bg: "bg-primary/5" },
                { label: "7 Hari Ini",     value: weekTotal,                       icon: TrendingUp, color: "text-blue-500",    bg: "bg-blue-500/5" },
                { label: "Berhasil",       value: analytics?.totalSuccess ?? 0,   icon: Check,     color: "text-green-500",   bg: "bg-green-500/5" },
                { label: "Error",          value: analytics?.totalErrors ?? 0,    icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/5" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className={`rounded-xl border border-border ${s.bg} p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${s.color}`} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
            {/* Bar chart */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Request 14 Hari Terakhir</p>
              {analytics ? <BarChart days={analytics.days} /> : (
                <div className="h-16 rounded-lg bg-muted/40 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Belum ada data analytics</p>
                </div>
              )}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary" /><span className="text-xs text-muted-foreground">Hari ini</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary/30" /><span className="text-xs text-muted-foreground">Hari lain</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── API Key ── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5"><Key className="h-4 w-4 text-primary" /></div>
              <span className="font-semibold text-sm">API Key</span>
            </div>
            <Link href="/docs"><Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground">Docs →</Button></Link>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-xl bg-muted px-4 py-3 text-sm font-mono text-foreground truncate border border-border">{user.apikey}</code>
              <Button variant="outline" size="icon" onClick={copyKey} className="flex-shrink-0 rounded-xl h-10 w-10">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Tambahkan <code className="bg-muted px-1.5 py-0.5 rounded-md">?apikey=YOUR_KEY</code> ke setiap request.</p>
              <Button variant="ghost" size="sm" onClick={handleRegenKey} disabled={regen} className="text-destructive hover:text-destructive text-xs gap-1.5 flex-shrink-0">
                {regen ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}Regenerate
              </Button>
            </div>
          </div>
        </div>

        {/* ── Edit Profil ── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5"><User className="h-4 w-4 text-primary" /></div>
            <span className="font-semibold text-sm">Edit Profil</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-muted-foreground" />Email</label>
              <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} type="email" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password Baru</label>
              <Input value={editPass} onChange={e => setEditPass(e.target.value)} type="password" placeholder="Kosongkan jika tidak ingin diganti" className="rounded-xl" />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveProfile} disabled={saving} className="rounded-xl gap-2">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan…</> : "Simpan Perubahan"}
              </Button>
              <Button variant="outline" onClick={() => setShowUsernameModal(true)} className="rounded-xl gap-2">
                <AtSign className="h-4 w-4" />Ganti Username
              </Button>
            </div>
          </div>
        </div>

        {/* ── Sesi Aktif ── */}
        <ActiveSessions onLogoutAll={handleLogout} />

        {/* ── Account & Export ── */}
        <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Akun dibuat: <span className="font-medium text-foreground">{new Date(user.created).toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportData} className="text-xs rounded-xl gap-1.5">
              <Download className="h-3 w-3" />Export Data
            </Button>
            <Link href="/docs"><Button variant="outline" size="sm" className="text-xs rounded-xl gap-1.5"><Key className="h-3 w-3" />API Docs</Button></Link>
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-red-200 dark:border-red-900/40 bg-red-500/5 flex items-center gap-2.5">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-1.5"><AlertTriangle className="h-4 w-4 text-red-500" /></div>
            <span className="font-semibold text-sm text-red-600 dark:text-red-400">Zona Berbahaya</span>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Hapus Akun</p>
              <p className="text-xs text-muted-foreground mt-1">Menghapus akun permanen. Tidak bisa dibatalkan.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setShowDeleteModal(true); setDeleteConfirmPass(""); setDeleteError(""); }}
              className="flex-shrink-0 gap-2 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-xl">
              <Trash2 className="h-3.5 w-3.5" />Hapus Akun
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
}

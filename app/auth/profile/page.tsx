"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlayCircle, Copy, Check, RefreshCw, LogOut, Loader2,
  Key, User, Mail, Activity, Shield, Camera, Trash2, AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { ToastContainer, useToast } from "@/components/toast-notification";

interface UserData {
  username: string;
  email:    string;
  avatar:   string;
  apikey:   string;
  plan:     string;
  requests: number;
  created:  string;
}

export default function ProfilePage() {
  const router           = useRouter();
  const fileRef          = useRef<HTMLInputElement>(null);
  const [user, setUser]  = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied,  setCopied]  = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [regen,   setRegen]   = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [editPass,  setEditPass]  = useState("");

  // Delete account modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmPass, setDeleteConfirmPass] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => { if (j.success) { setUser(j.user); setEditEmail(j.user.email); } else router.push("/auth/login"); })
      .finally(() => setLoading(false));
  }, [router]);

  const copyKey = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.apikey);
    setCopied(true);
    addToast("API key berhasil disalin ke clipboard.", "success");
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
      if (json.success) { setUser((u) => u ? { ...u, avatar: base64 } : u); addToast("Foto profil berhasil diperbarui!", "success"); }
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
    if (Object.keys(body).length === 0) { setSaving(false); addToast("Tidak ada perubahan.", "success"); return; }
    const res  = await fetch("/api/auth/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = await res.json();
    if (json.success) { setUser((u) => u ? { ...u, ...body } : u); addToast("Profil berhasil diperbarui!", "success"); setEditPass(""); }
    else addToast(json.error ?? "Gagal update profil.", "error");
    setSaving(false);
  };

  const handleRegenKey = async () => {
    if (!confirm("Yakin mau generate ulang API key? Key lama akan tidak aktif.")) return;
    setRegen(true);
    const res  = await fetch("/api/auth/regen-key", { method: "POST" });
    const json = await res.json();
    if (json.success) { setUser((u) => u ? { ...u, apikey: json.apikey } : u); addToast("API key baru berhasil dibuat!", "success"); }
    else addToast(json.error ?? "Gagal generate key.", "error");
    setRegen(false);
  };

  const handleLogout = async () => {
    addToast("Kamu berhasil logout dari Snaptok. Sampai jumpa!", "logout");
    setTimeout(async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    }, 1200);
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirmPass) { setDeleteError("Masukkan password untuk konfirmasi."); return; }
    setDeleteLoading(true); setDeleteError("");
    try {
      const res  = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAccount: true, confirmPassword: deleteConfirmPass }),
      });
      const json = await res.json();
      if (!json.success) { setDeleteError(json.error ?? "Gagal menghapus akun. Periksa password kamu."); setDeleteLoading(false); return; }
      setShowDeleteModal(false);
      addToast("Akun berhasil dihapus. Semua data telah dihapus permanen.", "success");
      setTimeout(async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }, 1800);
    } catch {
      setDeleteError("Terjadi kesalahan. Coba lagi.");
      setDeleteLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Hapus Akun</h3>
                  <p className="text-sm text-muted-foreground">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>

              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 mb-5">
                <p className="text-sm text-red-600 dark:text-red-400 leading-relaxed">
                  <strong>Perhatian!</strong> Menghapus akun akan menghapus semua data kamu secara permanen, termasuk API key, histori request, dan informasi profil. Data yang sudah dihapus tidak bisa dipulihkan.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Konfirmasi dengan Password</label>
                  <Input
                    type="password"
                    value={deleteConfirmPass}
                    onChange={(e) => setDeleteConfirmPass(e.target.value)}
                    placeholder="Masukkan password kamu"
                    className="rounded-xl"
                  />
                </div>
                {deleteError && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                    <p className="text-sm text-destructive">{deleteError}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-11"
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmPass(""); setDeleteError(""); }}
                disabled={deleteLoading}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl h-11 gap-2"
                onClick={handleDeleteAccount}
                disabled={deleteLoading || !deleteConfirmPass}
              >
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
            <Link href="/docs">
              <Button variant="outline" size="sm" className="gap-2">
                <Key className="h-3.5 w-3.5" />
                API Docs
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" />Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Profile hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-3xl px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-muted overflow-hidden ring-2 ring-primary/20 shadow-xl">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.username} width={112} height={112} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors border-2 border-background"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{user.email}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-semibold ${user.plan === "pro" ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" : "bg-primary/5 border-primary/20 text-primary"}`}>
                  <Shield className="h-3 w-3" />
                  {user.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                  Bergabung sejak {new Date(user.created).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Stats card */}
            <div className="flex gap-4 sm:gap-6 rounded-2xl border border-border bg-background/80 backdrop-blur px-6 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{user.requests.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Activity className="h-3 w-3" /> Requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl px-4 py-8 space-y-5">

        {/* API Key */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5">
                <Key className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-sm">API Key</span>
            </div>
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground">
                Lihat Docs <span aria-hidden>→</span>
              </Button>
            </Link>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-xl bg-muted px-4 py-3 text-sm font-mono text-foreground truncate border border-border">
                {user.apikey}
              </code>
              <Button variant="outline" size="icon" onClick={copyKey} className="flex-shrink-0 rounded-xl h-10 w-10">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Tambahkan <code className="bg-muted px-1.5 py-0.5 rounded-md">?apikey=YOUR_KEY</code> ke setiap request API.
              </p>
              <Button variant="ghost" size="sm" onClick={handleRegenKey} disabled={regen} className="text-destructive hover:text-destructive flex-shrink-0 text-xs gap-1.5">
                {regen ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                Regenerate
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-1.5">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">Edit Profil</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email
              </label>
              <Input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                type="email"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password Baru</label>
              <Input
                value={editPass}
                onChange={(e) => setEditPass(e.target.value)}
                type="password"
                placeholder="Kosongkan jika tidak ingin diganti"
                className="rounded-xl"
              />
            </div>
            <Button onClick={handleSaveProfile} disabled={saving} className="rounded-xl gap-2">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan...</> : "Simpan Perubahan"}
            </Button>
          </div>
        </div>

        {/* Account info */}
        <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Akun dibuat:{" "}
            <span className="font-medium text-foreground">
              {new Date(user.created).toLocaleDateString("id-ID", { dateStyle: "long" })}
            </span>
          </p>
          <Link href="/docs">
            <Button variant="outline" size="sm" className="text-xs rounded-xl gap-1.5">
              <Key className="h-3 w-3" /> API Docs
            </Button>
          </Link>
        </div>

        {/* Danger Zone - Delete Account */}
        <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-red-200 dark:border-red-900/40 bg-red-500/5 flex items-center gap-2.5">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-1.5">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <span className="font-semibold text-sm text-red-600 dark:text-red-400">Zona Berbahaya</span>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm text-foreground">Hapus Akun</p>
              <p className="text-xs text-muted-foreground mt-1">
                Menghapus akun akan menghapus semua data kamu secara permanen. Tindakan ini tidak bisa dibatalkan.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowDeleteModal(true); setDeleteConfirmPass(""); setDeleteError(""); }}
              className="flex-shrink-0 gap-2 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500/40 rounded-xl"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Hapus Akun
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
}

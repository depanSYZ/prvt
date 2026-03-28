"use client";
// app/logout/page.tsx
// Middleware sudah handle redirect + clear cookie via /logout
// Halaman ini sebagai fallback + bersihkan session metadata di server
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PlayCircle } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Panggil API POST untuk bersihkan session metadata di server
    fetch("/api/auth/logout", { method: "POST" })
      .finally(() => {
        router.push("/");
        router.refresh();
      });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted/30">
      <Link_Polyfill />
      <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
          <Loader2 className="h-7 w-7 text-primary animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">Sedang logout…</p>
          <p className="text-sm text-muted-foreground mt-1">Kamu akan dialihkan ke halaman utama</p>
        </div>
      </div>
    </div>
  );
}

// Inline logo tanpa import Link untuk hindari layout shift
function Link_Polyfill() {
  return (
    <a href="/" className="inline-flex items-center gap-2 text-xl font-bold text-foreground/60">
      <PlayCircle className="h-7 w-7 text-primary" />
      <span>Snap<span className="text-muted-foreground">-Tok</span></span>
    </a>
  );
}

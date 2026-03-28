"use client";
import Link from "next/link";
import { useEffect } from "react";
import { PlayCircle, Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-foreground/80 hover:text-foreground transition-colors">
          <PlayCircle className="h-7 w-7 text-primary" />
          <span>Snap<span className="text-muted-foreground">-Tok</span></span>
        </Link>

        <div className="relative">
          <div className="text-[120px] sm:text-[160px] font-black text-destructive/10 leading-none select-none">500</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center shadow-lg">
              <AlertTriangle className="h-9 w-9 text-destructive" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Terjadi Kesalahan</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Maaf, terjadi kesalahan pada server kami. Tim kami sudah diberitahu.
            Coba refresh halaman atau kembali ke beranda.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono mt-2">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gap-2 rounded-xl w-full sm:w-auto">
            <RefreshCw className="h-4 w-4" />Coba Lagi
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2 rounded-xl w-full sm:w-auto">
              <Home className="h-4 w-4" />Kembali ke Beranda
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

import Link from "next/link";
import { PlayCircle, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-foreground/80 hover:text-foreground transition-colors">
          <PlayCircle className="h-7 w-7 text-primary" />
          <span>Snap<span className="text-muted-foreground">-Tok</span></span>
        </Link>

        {/* 404 illustration */}
        <div className="relative">
          <div className="text-[120px] sm:text-[160px] font-black text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
              <Search className="h-9 w-9 text-primary" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Halaman Tidak Ditemukan</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
            Coba kembali ke halaman utama.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 rounded-xl w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" className="gap-2 rounded-xl w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              API Docs
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-3">Halaman populer</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/",              label: "TikTok Downloader" },
              { href: "/douyin",        label: "Douyin Downloader" },
              { href: "/tiktok-search", label: "TikTok Search" },
              { href: "/faq",           label: "FAQ" },
              { href: "/docs",          label: "API Docs" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted hover:text-foreground text-muted-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

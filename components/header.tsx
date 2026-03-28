"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Home, HelpCircle, Shield, BookOpen, FileText, User, LogIn, X, Menu, Scale } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLang } from "@/lib/lang-context";
import { translations as tr, t } from "@/lib/i18n";

const loginLabel: Record<string, string>    = { en: "Login",    id: "Masuk",  ru: "Войти",       zh: "登录",   ar: "دخول" };
const registerLabel: Record<string, string> = { en: "Register", id: "Daftar", ru: "Регистрация", zh: "注册",   ar: "تسجيل" };
const profileLabel: Record<string, string>  = { en: "Profile",  id: "Profil", ru: "Профиль",     zh: "个人中心", ar: "الملف الشخصي" };

export function Header() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => setLoggedIn(!!j.success))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { href: "/",        label: t(tr.nav.home,    lang), icon: Home },
    { href: "/faq",     label: t(tr.nav.faq,     lang), icon: HelpCircle },
    { href: "/privacy", label: t(tr.nav.privacy, lang), icon: Shield },
    { href: "/terms",   label: t(tr.nav.terms,   lang), icon: Scale },
    { href: "/guide",   label: t(tr.nav.guide,   lang), icon: BookOpen },
    { href: "/docs",    label: t(tr.nav.docs,    lang), icon: FileText },
  ];

  const lLogin   = loginLabel[lang]    ?? loginLabel.en;
  const lReg     = registerLabel[lang] ?? registerLabel.en;
  const lProfile = profileLabel[lang]  ?? profileLabel.en;

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ${scrolled ? "bg-background/98 shadow-sm backdrop-blur-md" : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-foreground/80">
            <PlayCircle className="h-7 w-7 text-primary" />
            <span>Snap<span className="text-muted-foreground">-Tok</span></span>
          </Link>

          {/* Platform switcher */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-muted p-1 text-sm">
            <span className="rounded-full px-4 py-1.5 font-medium bg-background text-foreground shadow-sm">🎵 TikTok</span>
            <Link href="/douyin" className="rounded-full px-4 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground">🎬 Douyin</Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {link.label}
              </Link>
            ))}
            <div className="ml-1 pl-1 border-l border-border flex items-center gap-1">
              <LanguageSwitcher />
              {loggedIn ? (
                <Link href="/auth/profile">
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                    <User className="h-4 w-4" />
                    <span className="text-xs">{lProfile}</span>
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-1">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                      <LogIn className="h-4 w-4" />
                      <span className="text-xs">{lLogin}</span>
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="h-8 text-xs px-3">{lReg}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${isOpen ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
            >
              <span className="sr-only">{isOpen ? "Tutup menu" : "Buka menu"}</span>
              {/* Animated hamburger icon */}
              <span className="absolute flex flex-col gap-[5px] w-5">
                <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-[2px] bg-current rounded-full transition-all duration-200 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 md:hidden h-full w-[300px] sm:w-[340px] bg-background shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
            <PlayCircle className="h-6 w-6 text-primary" />
            <span>Snap<span className="text-muted-foreground">-Tok</span></span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Platform switcher mobile */}
        <div className="px-5 py-4 border-b border-border">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Platform</p>
          <div className="flex items-center gap-2">
            <Link href="/" onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
              🎵 TikTok
            </Link>
            <Link href="/douyin" onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              🎬 Douyin
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Navigasi</p>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:translate-x-0.5 active:scale-[0.98]">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth section */}
        <div className="px-5 py-4 border-t border-border space-y-2">
          {loggedIn ? (
            <Link href="/auth/profile" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full gap-2 rounded-xl h-11">
                <User className="h-4 w-4" />{lProfile}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2 rounded-xl h-11">
                  <LogIn className="h-4 w-4" />{lLogin}
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-xl h-11">{lReg}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

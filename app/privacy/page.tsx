"use client";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shield, Eye, Lock, Cookie, FileText, Globe, Key, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations as tr, t, LangCode } from "@/lib/i18n";
import Link from "next/link";

type SectionKey = "collect" | "security" | "cookies" | "copyright" | "platforms" | "account";

const sectionConfig: { key: SectionKey; icon: React.ElementType; color: string }[] = [
  { key: "collect",   icon: Eye,      color: "blue" },
  { key: "security",  icon: Lock,     color: "emerald" },
  { key: "cookies",   icon: Cookie,   color: "amber" },
  { key: "copyright", icon: FileText, color: "purple" },
  { key: "platforms", icon: Globe,    color: "rose" },
  { key: "account",   icon: Key,      color: "indigo" },
];

const colorMap: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; dot: string }> = {
  blue:    { bg: "bg-blue-500/5",    border: "border-blue-500/20",    iconBg: "bg-blue-500/10",    iconColor: "text-blue-500",    dot: "bg-blue-500" },
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", dot: "bg-emerald-500" },
  amber:   { bg: "bg-amber-500/5",   border: "border-amber-500/20",   iconBg: "bg-amber-500/10",   iconColor: "text-amber-500",   dot: "bg-amber-500" },
  purple:  { bg: "bg-purple-500/5",  border: "border-purple-500/20",  iconBg: "bg-purple-500/10",  iconColor: "text-purple-500",  dot: "bg-purple-500" },
  rose:    { bg: "bg-rose-500/5",    border: "border-rose-500/20",    iconBg: "bg-rose-500/10",    iconColor: "text-rose-500",    dot: "bg-rose-500" },
  indigo:  { bg: "bg-indigo-500/5",  border: "border-indigo-500/20",  iconBg: "bg-indigo-500/10",  iconColor: "text-indigo-500",  dot: "bg-indigo-500" },
};

function titleFor(key: SectionKey, lang: LangCode): string {
  const map: Record<SectionKey, Record<LangCode, string>> = {
    collect:   tr.privacy_page.sec_collect   as Record<LangCode, string>,
    security:  tr.privacy_page.sec_security  as Record<LangCode, string>,
    cookies:   tr.privacy_page.sec_cookies   as Record<LangCode, string>,
    copyright: tr.privacy_page.sec_copyright as Record<LangCode, string>,
    platforms: tr.privacy_page.sec_platforms as Record<LangCode, string>,
    account:   tr.privacy_page.sec_account   as Record<LangCode, string>,
  };
  return map[key][lang] ?? map[key].en;
}

function bodyFor(key: SectionKey, lang: LangCode): string {
  const map: Record<SectionKey, Record<LangCode, string>> = {
    collect:   tr.privacy_page.collect_body   as Record<LangCode, string>,
    security:  tr.privacy_page.security_body  as Record<LangCode, string>,
    cookies:   tr.privacy_page.cookies_body   as Record<LangCode, string>,
    copyright: tr.privacy_page.copyright_body as Record<LangCode, string>,
    platforms: tr.privacy_page.platforms_body as Record<LangCode, string>,
    account:   tr.privacy_page.account_body   as Record<LangCode, string>,
  };
  return map[key][lang] ?? map[key].en;
}

export default function PrivacyPage() {
  const { lang } = useLang();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden py-16 sm:py-20 px-4 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 p-4 mb-6 shadow-lg">
              <Shield className="h-9 w-9 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t(tr.privacy_page.title, lang)}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t(tr.privacy_page.subtitle, lang)}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {t(tr.privacy_page.updated, lang)}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary">
                <Globe className="h-3 w-3" />
                {lang === "en" ? "Applies to all platforms" :
                 lang === "id" ? "Berlaku untuk semua platform" :
                 lang === "ru" ? "Применимо ко всем платформам" :
                 lang === "zh" ? "适用于所有平台" :
                 "ينطبق على جميع المنصات"}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="container mx-auto max-w-4xl px-4 py-12 space-y-4">
          {sectionConfig.map(({ key, icon: Icon, color }) => {
            const c = colorMap[color];
            const body = bodyFor(key, lang);
            return (
              <div key={key} className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>
                <div className="px-6 py-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`h-5 w-5 ${c.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-foreground mb-3">
                      {titleFor(key, lang)}
                    </h2>
                    <div className="space-y-1.5">
                      {body.split("\n\n").map((para, i) => (
                        <div key={i}>
                          {para.startsWith("•") ? (
                            <ul className="space-y-1">
                              {para.split("\n").map((line, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  {line.startsWith("•") ? (
                                    <>
                                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                                      <span>{line.slice(1).trim()}</span>
                                    </>
                                  ) : (
                                    <span className="font-medium text-foreground">{line}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold mb-2">{t(tr.privacy_page.contact, lang)}</h2>
            <p className="text-sm text-muted-foreground mb-3">{t(tr.privacy_page.contact_sub, lang)}</p>
            <a href="mailto:support@snaptok.my.id"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
              support@snaptok.my.id <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Policy Changes */}
          <div className="rounded-xl border border-border bg-muted/20 px-5 py-4">
            <h3 className="text-sm font-semibold mb-1">{t(tr.privacy_page.changes, lang)}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t(tr.privacy_page.changes_body, lang)}</p>
          </div>

          {/* Cross-links */}
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link href="/guide" className="text-xs text-primary/70 hover:text-primary hover:underline flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {t(tr.nav.guide, lang)}
            </Link>
            <Link href="/faq" className="text-xs text-primary/70 hover:text-primary hover:underline flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {t(tr.nav.faq, lang)}
            </Link>
            <Link href="/douyin/privacy" className="text-xs text-primary/70 hover:text-primary hover:underline flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {lang === "en" ? "Douyin Privacy" : lang === "id" ? "Privasi Douyin" : "Douyin Privacy"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

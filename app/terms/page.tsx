"use client";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Scale, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations as tr, t, LangCode } from "@/lib/i18n";

type TermsSection = {
  icon: React.ElementType;
  color: string;
  titleKey: keyof typeof tr.terms;
  bodyKey:  keyof typeof tr.terms;
};

const sections: TermsSection[] = [
  { icon: CheckCircle,  color: "green",  titleKey: "accept_title",     bodyKey: "accept_body" },
  { icon: Info,         color: "blue",   titleKey: "use_title",        bodyKey: "use_body" },
  { icon: AlertTriangle,color: "amber",  titleKey: "disclaimer_title", bodyKey: "disclaimer_body" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  green: { bg: "bg-green-50 dark:bg-green-950/20",  border: "border-green-200 dark:border-green-800/40",  text: "text-green-600 dark:text-green-400",  iconBg: "bg-green-100 dark:bg-green-900/40" },
  blue:  { bg: "bg-blue-50 dark:bg-blue-950/20",    border: "border-blue-200 dark:border-blue-800/40",    text: "text-blue-600 dark:text-blue-400",    iconBg: "bg-blue-100 dark:bg-blue-900/40" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/20",  border: "border-amber-200 dark:border-amber-800/40",  text: "text-amber-600 dark:text-amber-400",  iconBg: "bg-amber-100 dark:bg-amber-900/40" },
};

export default function TermsPage() {
  const { lang } = useLang();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative overflow-hidden py-16 sm:py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 p-4 sm:p-5 mb-5 shadow-lg">
              <Scale className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t(tr.terms.title, lang)}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t(tr.terms.subtitle, lang)}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {t(tr.privacy_page.updated, lang)}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 pb-16 space-y-4">
          {sections.map((section) => {
            const Icon  = section.icon;
            const c     = colorMap[section.color];
            const title = t(tr.terms[section.titleKey] as Record<LangCode, string>, lang);
            const body  = t(tr.terms[section.bodyKey]  as Record<LangCode, string>, lang);
            return (
              <div key={section.titleKey} className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>
                <div className={`flex items-center gap-3 px-5 sm:px-6 py-4 border-b ${c.border}`}>
                  <div className={`rounded-xl ${c.iconBg} p-2.5`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${c.text}`} />
                  </div>
                  <h2 className={`font-semibold text-sm sm:text-base ${c.text}`}>{title}</h2>
                </div>
                <div className="px-5 sm:px-6 py-4">
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

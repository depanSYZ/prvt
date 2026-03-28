"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LANG, LangCode, LANGUAGES } from "./i18n";

const LangContext = createContext<{
  lang:    LangCode;
  setLang: (l: LangCode) => void;
}>({ lang: DEFAULT_LANG, setLang: () => {} });

function getCookieLang(): LangCode | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie.split("; ").find((r) => r.startsWith("lang="));
  const val    = cookie?.split("=")[1] as LangCode | undefined;
  return val && LANGUAGES.some((l) => l.code === val) ? val : null;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Initialise synchronously from cookie if available (avoids flash)
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = getCookieLang();
    return saved ?? DEFAULT_LANG;
  });

  useEffect(() => {
    // Re-read on mount in case cookie wasn't accessible during SSR
    const saved = getCookieLang();
    if (saved && saved !== lang) setLangState(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    // Persist to cookie — 1 year, accessible everywhere
    document.cookie = `lang=${l};path=/;max-age=31536000;SameSite=Lax`;
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

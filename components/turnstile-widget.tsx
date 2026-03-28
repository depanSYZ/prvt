"use client";
// components/turnstile-widget.tsx
// Cloudflare Turnstile — load via CDN, TANPA import dari lib/config
// siteKey dibaca dari props atau env NEXT_PUBLIC_ agar tidak expose secret key ke browser

import { useEffect, useRef, useCallback } from "react";

interface TurnstileWidgetProps {
  siteKey:   string;                    // ← terima dari props, bukan import config
  onVerify:  (token: string) => void;
  onExpire?: () => void;
  onError?:  () => void;
  theme?:    "light" | "dark" | "auto";
  size?:     "normal" | "compact";
}

declare global {
  interface Window {
    turnstile?: {
      render:  (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset:   (id?: string) => void;
      remove:  (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export function TurnstileWidget({
  siteKey, onVerify, onExpire, onError,
  theme = "auto", size = "normal",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string | null>(null);
  const renderedRef  = useRef(false);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || renderedRef.current) return;
    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current); } catch { /* ignore */ }
      widgetIdRef.current = null;
    }
    renderedRef.current = true;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey:            siteKey,
      theme,
      size,
      callback:           (token: string)  => onVerify(token),
      "expired-callback": ()               => { renderedRef.current = false; widgetIdRef.current = null; onExpire?.(); },
      "error-callback":   ()               => { renderedRef.current = false; widgetIdRef.current = null; onError?.();  },
    });
  }, [siteKey, theme, size, onVerify, onExpire, onError]);

  useEffect(() => {
    const SCRIPT_ID = "cf-turnstile-script";

    if (window.turnstile) {
      // Script sudah loaded sebelumnya
      renderWidget();
      return;
    }

    if (document.getElementById(SCRIPT_ID)) {
      // Script sedang loading, chain ke callback
      const prev = window.onTurnstileLoad;
      window.onTurnstileLoad = () => { prev?.(); renderWidget(); };
      return;
    }

    // Inject script baru
    window.onTurnstileLoad = renderWidget;
    const script   = document.createElement("script");
    script.id      = SCRIPT_ID;
    script.src     = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
    script.async   = true;
    script.defer   = true;
    script.onerror = () => { onError?.(); };
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* ignore */ }
        widgetIdRef.current = null;
        renderedRef.current = false;
      }
    };
  }, [renderWidget, onError]);

  return <div ref={containerRef} className="flex justify-center min-h-[65px]" />;
}

export function resetTurnstile(widgetId?: string) {
  try { window.turnstile?.reset(widgetId); } catch { /* ignore */ }
}

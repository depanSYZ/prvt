"use client";
// components/turnstile-widget.tsx
// Cloudflare Turnstile widget — load via CDN script, tanpa package tambahan
import { useEffect, useRef, useCallback } from "react";
import { TURNSTILE } from "@/lib/config";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

// Extend Window type untuk Turnstile global
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset:  (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  theme = "auto",
  size  = "normal",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;
    // Hapus widget lama jika ada
    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current); } catch { /* ignore */ }
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey:           TURNSTILE.siteKey,
      theme,
      size,
      callback:          (token: string) => onVerify(token),
      "expired-callback": () => { widgetIdRef.current = null; onExpire?.(); },
      "error-callback":  () => { widgetIdRef.current = null; onError?.();  },
    });
  }, [theme, size, onVerify, onExpire, onError]);

  useEffect(() => {
    const SCRIPT_ID = "cf-turnstile-script";

    // Jika script sudah ada dan turnstile sudah ready, langsung render
    if (window.turnstile) {
      render();
      return;
    }

    // Jika script sudah ada tapi turnstile belum ready, tunggu callback
    if (document.getElementById(SCRIPT_ID)) {
      const prev = window.onTurnstileLoad;
      window.onTurnstileLoad = () => { prev?.(); render(); };
      return;
    }

    // Tambahkan script baru
    window.onTurnstileLoad = render;
    const script = document.createElement("script");
    script.id    = SCRIPT_ID;
    script.src   = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* ignore */ }
        widgetIdRef.current = null;
      }
    };
  }, [render]);

  return (
    <div ref={containerRef} className="flex justify-center" />
  );
}

/** Reset widget dari luar (misal setelah error) */
export function resetTurnstile() {
  if (window.turnstile) {
    try { window.turnstile.reset(); } catch { /* ignore */ }
  }
}

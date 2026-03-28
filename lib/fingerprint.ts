// lib/fingerprint.ts
// Browser fingerprint collector — dipakai di client side
// Semua data dikumpulkan di browser lalu dikirim ke server saat login

export interface BrowserFingerprint {
  userAgent:    string;
  language:     string;
  timezone:     string;
  screen:       string;   // "1920x1080x24"
  platform:     string;
  cookieEnabled: boolean;
  doNotTrack:   string | null;
  hardwareConcurrency: number;
  deviceMemory: number | undefined;
  touchSupport: boolean;
  colorDepth:   number;
  pixelRatio:   number;
  sessionId:    string;   // random per session (sessionStorage)
  deviceId:     string;   // persistent (localStorage)
}

/** Buat atau ambil device ID persisten dari localStorage */
function getOrCreateDeviceId(): string {
  try {
    const key = "__sntk_did";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = `d_${Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2,"0")).join("")}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    return "unknown";
  }
}

/** Buat atau ambil session ID per tab dari sessionStorage */
function getOrCreateSessionId(): string {
  try {
    const key = "__sntk_sid";
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = `s_${Array.from(crypto.getRandomValues(new Uint8Array(12))).map(b => b.toString(16).padStart(2,"0")).join("")}`;
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return "unknown";
  }
}

/** Kumpulkan fingerprint browser */
export function collectFingerprint(): BrowserFingerprint {
  const nav = navigator;
  return {
    userAgent:           nav.userAgent,
    language:            nav.language,
    timezone:            Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen:              `${screen.width}x${screen.height}x${screen.colorDepth}`,
    platform:            nav.platform,
    cookieEnabled:       nav.cookieEnabled,
    doNotTrack:          nav.doNotTrack,
    hardwareConcurrency: nav.hardwareConcurrency ?? 0,
    deviceMemory:        (nav as Navigator & { deviceMemory?: number }).deviceMemory,
    touchSupport:        navigator.maxTouchPoints > 0,
    colorDepth:          screen.colorDepth,
    pixelRatio:          window.devicePixelRatio ?? 1,
    sessionId:           getOrCreateSessionId(),
    deviceId:            getOrCreateDeviceId(),
  };
}

/** Hash fingerprint jadi string pendek untuk perbandingan server */
export async function hashFingerprint(fp: BrowserFingerprint): Promise<string> {
  const raw = [
    fp.userAgent,
    fp.language,
    fp.timezone,
    fp.screen,
    fp.platform,
    fp.hardwareConcurrency,
    fp.colorDepth,
    fp.pixelRatio,
  ].join("|");
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("").slice(0, 32);
}

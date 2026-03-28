// lib/session-store.ts
// Menyimpan metadata session aktif di Pterodactyl
// Key: _session_{jwtToken_hash}.json
// Isi: IP, fingerprint hash, device ID, created, last active, username

import { readUserFile, writeUserFile, deleteUserFile, listUserFiles } from "./pterodactyl";

export interface SessionMeta {
  username:        string;
  fingerprintHash: string;   // hash dari browser fingerprint
  deviceId:        string;   // localStorage device ID
  ip:              string;   // IP saat login
  userAgent:       string;
  createdAt:       string;   // ISO
  lastActiveAt:    string;   // ISO, diupdate tiap request
  sessionToken:    string;   // JWT token (untuk revoke)
}

function metaKey(tokenHash: string): string {
  return `_sess_${tokenHash}.json`;
}

/** Hash JWT token jadi key pendek */
async function hashToken(token: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("").slice(0,24);
}

/** Simpan session metadata baru */
export async function createSessionMeta(
  jwtToken: string,
  meta: Omit<SessionMeta, "createdAt" | "lastActiveAt" | "sessionToken">
): Promise<void> {
  const hash = await hashToken(jwtToken);
  const record: SessionMeta = {
    ...meta,
    sessionToken: jwtToken,
    createdAt:    new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
  await writeUserFile(metaKey(hash), record as unknown as Record<string, unknown>);
}

/** Ambil session metadata */
export async function getSessionMeta(jwtToken: string): Promise<SessionMeta | null> {
  const hash = await hashToken(jwtToken);
  return await readUserFile(metaKey(hash)) as SessionMeta | null;
}

/** Update lastActiveAt */
export async function touchSession(jwtToken: string): Promise<void> {
  const hash = await hashToken(jwtToken);
  const existing = await readUserFile(metaKey(hash)) as SessionMeta | null;
  if (!existing) return;
  existing.lastActiveAt = new Date().toISOString();
  await writeUserFile(metaKey(hash), existing as unknown as Record<string, unknown>);
}

/** Hapus session (logout) */
export async function deleteSessionMeta(jwtToken: string): Promise<void> {
  const hash = await hashToken(jwtToken);
  await deleteUserFile(metaKey(hash));
}

/** List semua session aktif milik username */
export async function listUserSessions(username: string): Promise<SessionMeta[]> {
  try {
    const files = await listUserFiles();
    const sesFiles = files.filter(f => f.startsWith("_sess_"));
    const sessions: SessionMeta[] = [];
    for (const file of sesFiles) {
      const data = await readUserFile(file) as SessionMeta | null;
      if (data && data.username === username) sessions.push(data);
    }
    return sessions.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
  } catch {
    return [];
  }
}

/** Hapus semua session milik username (logout semua device) */
export async function deleteAllUserSessions(username: string): Promise<void> {
  const sessions = await listUserSessions(username);
  for (const s of sessions) {
    await deleteSessionMeta(s.sessionToken);
  }
}

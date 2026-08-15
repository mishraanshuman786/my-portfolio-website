import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "am-portfolio-dev-secret-change-me";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "anshuman";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "anshuman@2026";
export const USING_DEFAULT_CREDS =
  !process.env.ADMIN_USERNAME && !process.env.ADMIN_PASSWORD;

export const SESSION_COOKIE = "am_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const enc = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const dec = (s: string) => Buffer.from(s, "base64url").toString("utf8");

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function createSessionToken(subject: string): string {
  const payload = enc(JSON.stringify({ sub: subject, exp: Date.now() + SESSION_TTL_MS }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(
  token: string | null | undefined
): { sub: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const provided = Buffer.from(sig);
  if (expected.length !== provided.length) return null;
  if (!timingSafeEqual(expected, provided)) return null;
  try {
    const data = JSON.parse(dec(payload)) as { sub?: string; exp?: number };
    if (!data.sub || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { sub: data.sub };
  } catch {
    return null;
  }
}

/** Returns the authenticated admin user from the request cookies, or null. */
export async function requireUser(): Promise<{ sub: string } | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value ?? null);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};

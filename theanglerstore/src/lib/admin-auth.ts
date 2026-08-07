import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin auth, deliberately minimal.
 *
 * One operator, one password in an env var. No auth service, no user table,
 * no third party. The cookie holds an HMAC of a fixed string keyed by the
 * password, so a stolen cookie can't be reversed into the password, and
 * changing ADMIN_PASSWORD invalidates every existing session.
 *
 * This is proportionate for a dashboard with no destructive actions. If the
 * panel ever gains write access to orders or refunds, replace it.
 */

const COOKIE = "tas_admin";
const PAYLOAD = "theanglerstore-admin-v1";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update(PAYLOAD).digest("hex");
}

/** Constant-time compare so we don't leak the password a byte at a time. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function checkPassword(candidate: string): string | null {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return null;
  if (!safeEqual(candidate, real)) return null;
  return tokenFor(real);
}

export async function isAuthed(): Promise<boolean> {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const jar = await cookies();
  const got = jar.get(COOKIE)?.value;
  if (!got) return false;
  return safeEqual(got, tokenFor(real));
}

export const ADMIN_COOKIE = COOKIE;

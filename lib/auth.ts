import crypto from "crypto";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SECRET = process.env.ADMIN_SESSION_SECRET || "default-secret";

export function authenticate(user: string, password: string): boolean {
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const ts = Date.now().toString();
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(ts)
    .digest("hex")
    .slice(0, 32);
  return `${ts}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [ts, sig] = parts;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(ts)
    .digest("hex")
    .slice(0, 32);
  if (sig !== expected) return false;

  // 7日間有効
  return Date.now() - parseInt(ts, 10) < 7 * 24 * 60 * 60 * 1000;
}

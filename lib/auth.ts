/**
 * 管理画面の認証ユーティリティ
 *
 * シンプルなCookieベースのセッション管理
 * - ユーザー名は環境変数 ADMIN_USER に設定
 * - パスワードは環境変数 ADMIN_PASSWORD に設定
 * - セッショントークンは環境変数 ADMIN_SESSION_SECRET に設定
 * - 未設定の場合、管理画面だけ使用不可（公開ページは正常動作）
 */

import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "clinic_admin_session";

/** 管理機能が使えるかどうか（環境変数が設定されているか） */
export function isAdminEnabled(): boolean {
  return !!(
    process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET
  );
}

/**
 * ユーザー名とパスワードを検証し、正しければセッショントークンを返す
 */
export function verifyCredentials(
  username: string,
  password: string
): string | null {
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !secret) return null;
  if (username !== adminUser) return null;
  if (password !== adminPassword) return null;
  return secret;
}

/** 後方互換：パスワードのみで検証（既存API用） */
export function verifyPassword(password: string): string | null {
  return verifyCredentials(process.env.ADMIN_USER || "admin", password);
}

/** Cookie からセッションを検証 */
export async function isAuthenticated(): Promise<boolean> {
  if (!isAdminEnabled()) return false;
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    if (!session) return false;
    return session.value === process.env.ADMIN_SESSION_SECRET;
  } catch {
    return false;
  }
}

/** セッション Cookie 名 */
export { SESSION_COOKIE_NAME };

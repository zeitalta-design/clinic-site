/**
 * Supabase サーバー専用クライアント（Service Role Key）
 *
 * API Route 内でのみ使用すること。
 * RLSをバイパスしてINSERT/UPDATE/DELETEを実行できる。
 * ブラウザ側には絶対に公開しない。
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!serviceRoleKey) {
  console.warn("[supabase-admin] SUPABASE_SERVICE_ROLE_KEY が未設定です。管理画面の書き込みは動作しません。");
}

export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;

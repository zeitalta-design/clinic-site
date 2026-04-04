import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/** Supabaseクライアント（環境変数未設定時はnull） */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          fetch: (url, options = {}) => {
            // Next.js のfetchキャッシュを無効化（ISR revalidate に任せる）
            return fetch(url, { ...options, cache: "no-store" });
          },
        },
      })
    : null;

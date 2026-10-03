import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/** Supabaseクライアント（環境変数未設定時はnull） */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          fetch: (url, options = {}) => {
            // ビルド時（静的書き出し）はそのまま取得して HTML に埋め込む。
            //   ※ no-store を付けると「動的な取得」とみなされ、静的書き出しでは取得自体が拒否される
            if (typeof window === "undefined") return fetch(url, options);
            // ブラウザでは常に最新を取得する（管理画面での更新を即座に反映するため）
            return fetch(url, { ...options, cache: "no-store" });
          },
        },
      })
    : null;

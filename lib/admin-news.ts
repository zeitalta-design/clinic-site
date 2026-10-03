/**
 * お知らせデータ（Supabase の clinic_news テーブル・読み取り専用）
 *
 * 接続先: 高橋クリニック専用の Supabase プロジェクト（takahashi-clinic）
 * DB列: id / date / category / title / body / published / created_at
 * アプリ内は従来どおり content / is_published の名前で扱い、この層で変換する。
 *
 * 読み取りは公開キー（publishable / anon）で行う。RLS により公開中（published=true）の行だけが返る。
 * 書き込み（管理画面）はブラウザからは行わず、サーバー側の public/api/admin/news.php が秘密キーで行う。
 */

import { supabase } from "./supabase";

const TABLE = "clinic_news";

export interface AdminNewsItem {
  id: string;
  title: string;
  date: string;
  content: string | null;
  is_published: boolean;
  created_at: string;
}

/** clinic_news テーブルの行 */
export type NewsRow = {
  id: string;
  date: string;
  category: string | null;
  title: string;
  body: string | null;
  published: boolean;
  created_at: string;
};

/** DB行 → アプリ内の形に変換 */
export function mapRow(r: NewsRow): AdminNewsItem {
  return {
    id: r.id,
    title: r.title,
    date: r.date,
    content: r.body,
    is_published: r.published,
    created_at: r.created_at,
  };
}

/** 公開ページ用: 公開中のお知らせのみ取得（投稿日時の新しい順） */
export async function getPublishedNewsList(limit = 3): Promise<AdminNewsItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from(TABLE).select("*").eq("published", true).order("created_at", { ascending: false }).limit(limit);
  if (error) { console.error("[admin-news]", error.message); return []; }
  return (data || []).map(mapRow);
}

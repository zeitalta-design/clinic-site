/**
 * お知らせデータ管理（Supabase版）
 *
 * 接続先: hospital-ai-prod プロジェクトの clinic_news テーブル
 * ※ 同プロジェクトには別サービス（病院AI）のテーブルが同居している。
 *   clinic_ 接頭辞のないテーブル（facilities 等）には絶対に触れないこと。
 *
 * DB列: id / date / category / title / body / published / created_at
 * アプリ内は従来どおり content / is_published の名前で扱い、この層で変換する。
 *
 * 読み取り: anon key
 * 書き込み: service role key があれば使用、無ければ anon key を試す
 *          （anon での書き込み可否は DB 側の RLS ポリシー次第）
 */

import { supabase } from "./supabase";
import { supabaseAdmin } from "./supabase-admin";

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
type NewsRow = {
  id: string;
  date: string;
  category: string | null;
  title: string;
  body: string | null;
  published: boolean;
  created_at: string;
};

/** DB行 → アプリ内の形に変換 */
function mapRow(r: NewsRow): AdminNewsItem {
  return {
    id: r.id,
    title: r.title,
    date: r.date,
    content: r.body,
    is_published: r.published,
    created_at: r.created_at,
  };
}

// ===== 読み取り =====

/** 管理画面用: 全件取得（投稿日時の新しい順） */
export async function getAdminNewsList(): Promise<AdminNewsItem[]> {
  const client = supabaseAdmin || supabase;
  if (!client) return [];
  const { data, error } = await client.from(TABLE).select("*").order("created_at", { ascending: false });
  if (error) { console.error("[admin-news]", error.message); return []; }
  return (data || []).map(mapRow);
}

/** 公開ページ用: 公開中のお知らせのみ取得（投稿日時の新しい順、anon key） */
export async function getPublishedNewsList(limit = 3): Promise<AdminNewsItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from(TABLE).select("*").eq("published", true).order("created_at", { ascending: false }).limit(limit);
  if (error) { console.error("[admin-news]", error.message); return []; }
  return (data || []).map(mapRow);
}

// ===== 書き込み（API Route からのみ呼ぶ） =====

function writeClient() {
  const client = supabaseAdmin || supabase;
  if (!client) throw new Error("Supabase が未設定です");
  return client;
}

/** 新規追加 */
export async function createNewsItem(item: {
  title: string; date: string; content?: string; is_published?: boolean;
}): Promise<AdminNewsItem | null> {
  const { data, error } = await writeClient().from(TABLE).insert({
    title: item.title, date: item.date, body: item.content || null, published: item.is_published ?? true,
  }).select().single();
  if (error) throw new Error(error.message);
  return data ? mapRow(data) : null;
}

/** 更新（clinic_news に updated_at 列は無いため送らない） */
export async function updateNewsItem(
  id: string, updates: { title?: string; date?: string; content?: string; is_published?: boolean }
): Promise<AdminNewsItem | null> {
  const dbUpdates: Record<string, unknown> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.date !== undefined) dbUpdates.date = updates.date;
  if (updates.content !== undefined) dbUpdates.body = updates.content;
  if (updates.is_published !== undefined) dbUpdates.published = updates.is_published;
  const { data, error } = await writeClient().from(TABLE).update(dbUpdates).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data ? mapRow(data) : null;
}

/** 削除 */
export async function deleteNewsItem(id: string): Promise<boolean> {
  const client = supabaseAdmin || supabase;
  if (!client) return false;
  const { error } = await client.from(TABLE).delete().eq("id", id);
  return !error;
}

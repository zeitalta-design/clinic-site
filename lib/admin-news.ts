/**
 * お知らせデータ管理（Supabase版）
 *
 * 読み取り: anon key（公開ページ + 管理画面一覧）
 * 書き込み: service role key（API Route 経由のみ）
 */

import { supabase } from "./supabase";
import { supabaseAdmin } from "./supabase-admin";

export interface AdminNewsItem {
  id: string;
  title: string;
  date: string;
  content: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ===== 読み取り（anon key） =====

/** 管理画面用: 全件取得（新しい順） */
export async function getAdminNewsList(): Promise<AdminNewsItem[]> {
  // 管理一覧もservice roleで取得（RLSで読み取り許可済みならanonでも可）
  const client = supabaseAdmin || supabase;
  if (!client) return [];
  const { data, error } = await client.from("news").select("*").order("date", { ascending: false });
  if (error) { console.error("[admin-news]", error.message); return []; }
  return data || [];
}

/** 公開ページ用: 公開中のお知らせのみ取得（anon key） */
export async function getPublishedNewsList(limit = 3): Promise<AdminNewsItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("news").select("*").eq("is_published", true).order("date", { ascending: false }).limit(limit);
  if (error) { console.error("[admin-news]", error.message); return []; }
  return data || [];
}

// ===== 書き込み（service role key — API Route からのみ呼ぶ） =====

/** 新規追加 */
export async function createNewsItem(item: {
  title: string; date: string; content?: string; is_published?: boolean;
}): Promise<AdminNewsItem | null> {
  if (!supabaseAdmin) throw new Error("Supabase service role が未設定です");
  const { data, error } = await supabaseAdmin.from("news").insert({
    title: item.title, date: item.date, content: item.content || null, is_published: item.is_published ?? true,
  }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

/** 更新 */
export async function updateNewsItem(
  id: string, updates: { title?: string; date?: string; content?: string; is_published?: boolean }
): Promise<AdminNewsItem | null> {
  if (!supabaseAdmin) throw new Error("Supabase service role が未設定です");
  const { data, error } = await supabaseAdmin.from("news").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

/** 削除 */
export async function deleteNewsItem(id: string): Promise<boolean> {
  if (!supabaseAdmin) return false;
  const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
  return !error;
}

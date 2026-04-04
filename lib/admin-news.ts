/**
 * お知らせデータ管理（Supabase版）
 *
 * Supabase の `news` テーブルを操作する。
 * 管理画面・公開ページの両方がこの層を通してデータにアクセスする。
 * Supabase 未設定時は空配列を返す（ビルド時クラッシュ防止）。
 */

import { supabase } from "./supabase";

export interface AdminNewsItem {
  id: string;
  title: string;
  date: string;
  content: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAdminNewsList(): Promise<AdminNewsItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("news").select("*").order("date", { ascending: false });
  if (error) { console.error("[admin-news]", error.message); return []; }
  return data || [];
}

export async function getNewsItemById(id: string): Promise<AdminNewsItem | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("news").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function createNewsItem(item: {
  title: string; date: string; content?: string; is_published?: boolean;
}): Promise<AdminNewsItem | null> {
  if (!supabase) throw new Error("Supabase未設定");
  const { data, error } = await supabase.from("news").insert({
    title: item.title, date: item.date, content: item.content || null, is_published: item.is_published ?? true,
  }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateNewsItem(
  id: string, updates: { title?: string; date?: string; content?: string; is_published?: boolean }
): Promise<AdminNewsItem | null> {
  if (!supabase) throw new Error("Supabase未設定");
  const { data, error } = await supabase.from("news").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteNewsItem(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("news").delete().eq("id", id);
  return !error;
}

export async function getPublishedNewsList(limit = 3): Promise<AdminNewsItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("news").select("*").eq("is_published", true).order("date", { ascending: false }).limit(limit);
  if (error) { console.error("[admin-news]", error.message); return []; }
  return data || [];
}

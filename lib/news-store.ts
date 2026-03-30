/**
 * お知らせデータストア
 *
 * JSONファイルベースのシンプルなストア
 * - data/news.json に永続化
 * - サーバーサイドでのみ使用
 * - 読み取り失敗時は空配列を返すフェールセーフ
 * - 将来 SQLite / Supabase に差し替え可能な設計
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  body?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const NEWS_FILE = join(DATA_DIR, "news.json");

/** dataディレクトリがなければ作成 */
function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

/** JSONファイルからニュース一覧を読み込む（フェールセーフ） */
export function getNews(): NewsItem[] {
  try {
    if (!existsSync(NEWS_FILE)) return [];
    const raw = readFileSync(NEWS_FILE, "utf-8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    // 旧データ互換：isPublished がない場合は true として扱う
    return data.map((item: Record<string, unknown>) => ({
      ...item,
      isPublished: item.isPublished !== false,
      createdAt: item.createdAt || item.date || "",
      updatedAt: item.updatedAt || item.date || "",
    })) as NewsItem[];
  } catch {
    return [];
  }
}

/** 公開中のニュースのみ取得（公開ページ用） */
export function getPublishedNews(): NewsItem[] {
  return getNews().filter((n) => n.isPublished);
}

/** ニュース一覧を保存（書き込み失敗時は例外をスローせずログ出力） */
export function saveNews(items: NewsItem[]): boolean {
  try {
    ensureDataDir();
    writeFileSync(NEWS_FILE, JSON.stringify(items, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[news-store] 保存に失敗しました:", err);
    return false;
  }
}

/** 新しいニュースを追加（先頭に挿入） */
export function addNews(
  item: Omit<NewsItem, "id" | "createdAt" | "updatedAt">
): NewsItem {
  const items = getNews();
  const now = new Date().toISOString();
  const newItem: NewsItem = {
    ...item,
    id: `news-${Date.now()}`,
    isPublished: item.isPublished !== false,
    createdAt: now,
    updatedAt: now,
  };
  items.unshift(newItem);
  saveNews(items);
  return newItem;
}

/** ニュースを更新 */
export function updateNews(
  id: string,
  updates: Partial<Omit<NewsItem, "id" | "createdAt">>
): NewsItem | null {
  const items = getNews();
  const idx = items.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  items[idx] = {
    ...items[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveNews(items);
  return items[idx];
}

/** ニュースを削除 */
export function deleteNews(id: string): boolean {
  const items = getNews();
  const filtered = items.filter((n) => n.id !== id);
  if (filtered.length === items.length) return false;
  saveNews(filtered);
  return true;
}

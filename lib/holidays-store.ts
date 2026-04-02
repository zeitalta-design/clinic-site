/**
 * 休院日データストア
 *
 * JSONファイルベースのシンプルなストア（news-store.ts と同パターン）
 * - data/holidays.json に永続化
 * - サーバーサイドでのみ使用
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

export interface HolidayItem {
  id: string;
  /** 日付 YYYY-MM-DD */
  date: string;
  /** 種別 */
  type: HolidayType;
  /** 表示ラベル（任意） */
  label?: string;
  /** 補足メモ（任意） */
  note?: string;
  /** 公開フラグ */
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const HOLIDAYS_FILE = join(DATA_DIR, "holidays.json");

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

/** 全件取得（管理用） */
export function getHolidays(): HolidayItem[] {
  try {
    if (!existsSync(HOLIDAYS_FILE)) return [];
    const raw = readFileSync(HOLIDAYS_FILE, "utf-8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.map((item: Record<string, unknown>) => ({
      ...item,
      isPublished: item.isPublished !== false,
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
    })) as HolidayItem[];
  } catch {
    return [];
  }
}

/** 公開中の休院日のみ取得（公開ページ用） */
export function getPublishedHolidays(): HolidayItem[] {
  return getHolidays().filter((h) => h.isPublished);
}

/** 保存 */
export function saveHolidays(items: HolidayItem[]): boolean {
  try {
    ensureDataDir();
    writeFileSync(HOLIDAYS_FILE, JSON.stringify(items, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[holidays-store] 保存に失敗しました:", err);
    return false;
  }
}

/** 追加（日付順にソート） */
export function addHoliday(
  item: Omit<HolidayItem, "id" | "createdAt" | "updatedAt">
): HolidayItem {
  const items = getHolidays();
  const now = new Date().toISOString();
  const newItem: HolidayItem = {
    ...item,
    id: `holiday-${Date.now()}`,
    isPublished: item.isPublished !== false,
    createdAt: now,
    updatedAt: now,
  };
  items.push(newItem);
  items.sort((a, b) => a.date.localeCompare(b.date));
  saveHolidays(items);
  return newItem;
}

/** 更新 */
export function updateHoliday(
  id: string,
  updates: Partial<Omit<HolidayItem, "id" | "createdAt">>
): HolidayItem | null {
  const items = getHolidays();
  const idx = items.findIndex((h) => h.id === id);
  if (idx === -1) return null;
  items[idx] = {
    ...items[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  items.sort((a, b) => a.date.localeCompare(b.date));
  saveHolidays(items);
  return items[idx];
}

/** 削除 */
export function deleteHoliday(id: string): boolean {
  const items = getHolidays();
  const filtered = items.filter((h) => h.id !== id);
  if (filtered.length === items.length) return false;
  saveHolidays(filtered);
  return true;
}

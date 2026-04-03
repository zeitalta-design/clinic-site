/**
 * microCMS クライアント & データ取得
 *
 * スタッフ運用を最小化するため、以下の方針で設計:
 * - news の日付は publishedAt（microCMS自動付与）を使用
 *   → スタッフは「タイトル・カテゴリ・本文」だけ入力すればよい
 * - holidays は「日付・種別」の2項目だけで運用可能
 * - label / note は任意。未入力でも表示崩れしない
 *
 * コンテンツモデル（microCMS側で作成）:
 *   news (リスト型):
 *     - title: テキスト（必須）
 *     - category: セレクト（任意）→ お知らせ / 重要 / 休診
 *     - body: テキストエリア（任意）
 *
 *   holidays (リスト型):
 *     - date: 日付（必須）
 *     - type: セレクト（必須）→ 休診 / 午前休 / 午後休 / 臨時休診
 *     - label: テキスト（任意）
 *     - note: テキスト（任意）
 *
 * 環境変数:
 *   MICROCMS_SERVICE_DOMAIN - microCMS のサービスドメイン
 *   MICROCMS_API_KEY - microCMS の API キー
 */

import { createClient } from "microcms-js-sdk";

/* ---------- クライアント ---------- */

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN ?? "";
const apiKey = process.env.MICROCMS_API_KEY ?? "";

const client =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

/* ---------- 型定義 ---------- */

export interface CmsNewsItem {
  id: string;
  title: string;
  category?: string;
  body?: string;
  /** microCMS が自動付与する公開日時（表示用の日付に使用） */
  publishedAt: string;
  updatedAt: string;
}

export type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

const VALID_HOLIDAY_TYPES: readonly string[] = ["休診", "午前休", "午後休", "臨時休診"];

export interface CmsHolidayItem {
  id: string;
  date: string;
  type: HolidayType;
  label?: string;
  note?: string;
  publishedAt: string;
  updatedAt: string;
}

/* ---------- お知らせ取得 ---------- */

export async function getNews(limit = 10): Promise<CmsNewsItem[]> {
  if (!client) return getFallbackNews(limit);
  try {
    const res = await client.getList<CmsNewsItem>({
      endpoint: "news",
      queries: { limit, orders: "-publishedAt" },
    });
    return res.contents.map(sanitizeNewsItem);
  } catch (e) {
    console.error("[microCMS] news取得失敗:", e);
    return getFallbackNews();
  }
}

/* ---------- 休診日取得 ---------- */

export async function getHolidays(): Promise<CmsHolidayItem[]> {
  if (!client) return [];
  try {
    const res = await client.getList<CmsHolidayItem>({
      endpoint: "holidays",
      queries: { limit: 100, orders: "date" },
    });
    return res.contents.map(sanitizeHolidayItem);
  } catch (e) {
    console.error("[microCMS] holidays取得失敗:", e);
    return [];
  }
}

/* ---------- サニタイズ & フォールバック ---------- */

/** news: カテゴリが想定外なら "お知らせ" にフォールバック */
function sanitizeNewsItem(item: CmsNewsItem): CmsNewsItem {
  const validCategories = ["お知らせ", "重要", "休診"];
  return {
    ...item,
    title: item.title || "（無題）",
    category: item.category && validCategories.includes(item.category)
      ? item.category
      : undefined,
    publishedAt: item.publishedAt || item.updatedAt || "",
  };
}

/** holidays: typeが想定外なら "休診" にフォールバック */
function sanitizeHolidayItem(item: CmsHolidayItem): CmsHolidayItem {
  return {
    ...item,
    date: item.date || "",
    type: VALID_HOLIDAY_TYPES.includes(item.type) ? item.type : "休診" as HolidayType,
  };
}

/* ---------- フォールバック（CMS未設定時はローカルJSONを使用） ---------- */

function getFallbackNews(limit = 10): CmsNewsItem[] {
  try {
    const fs = require("fs");
    const path = require("path");
    const file = path.join(process.cwd(), "data", "news.json");
    if (!fs.existsSync(file)) return [];
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    const all = (data as Record<string, unknown>[])
      .filter((item) => item.isPublished !== false)
      .map((item) =>
        sanitizeNewsItem({
          id: (item.id as string) || "",
          title: (item.title as string) || "",
          category: item.category as string | undefined,
          body: item.body as string | undefined,
          publishedAt: (item.date as string) || (item.createdAt as string) || "",
          updatedAt: (item.updatedAt as string) || "",
        })
      )
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return all.slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * microCMS クライアント & データ取得
 *
 * コンテンツモデル:
 *   news (リスト型):
 *     - title: テキスト
 *     - date: 日付
 *     - category: セレクト（お知らせ / 重要 / 休診）
 *     - body: テキストエリア
 *
 *   holidays (リスト型):
 *     - date: 日付
 *     - type: セレクト（休診 / 午前休 / 午後休 / 臨時休診）
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
  date: string;
  category?: string;
  body?: string;
  publishedAt: string;
  updatedAt: string;
}

export type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

export interface CmsHolidayItem {
  id: string;
  date: string;
  /** microCMS セレクトフィールド（単一選択 = 文字列） */
  type: HolidayType;
  label?: string;
  note?: string;
  publishedAt: string;
  updatedAt: string;
}

/* ---------- お知らせ取得 ---------- */

export async function getNews(limit = 10): Promise<CmsNewsItem[]> {
  if (!client) return getFallbackNews();
  try {
    const res = await client.getList<CmsNewsItem>({
      endpoint: "news",
      queries: { limit, orders: "-date" },
    });
    return res.contents;
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
    return res.contents;
  } catch (e) {
    console.error("[microCMS] holidays取得失敗:", e);
    return [];
  }
}

/* ---------- フォールバック（CMS未設定時はローカルJSONを使用） ---------- */

function getFallbackNews(): CmsNewsItem[] {
  try {
    // ビルド時にdata/news.jsonを読む（CMS未接続時の安全策）
    const fs = require("fs");
    const path = require("path");
    const file = path.join(process.cwd(), "data", "news.json");
    if (!fs.existsSync(file)) return [];
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    return (data as Record<string, unknown>[]).map((item) => ({
      id: (item.id as string) || "",
      title: (item.title as string) || "",
      date: (item.date as string) || "",
      category: item.category as string | undefined,
      body: item.body as string | undefined,
      publishedAt: (item.createdAt as string) || "",
      updatedAt: (item.updatedAt as string) || "",
    }));
  } catch {
    return [];
  }
}

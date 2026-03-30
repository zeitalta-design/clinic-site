/**
 * 公開用ニュース取得API
 * GET /api/news — 公開中のお知らせのみ返す
 */

import { NextResponse } from "next/server";
import { getPublishedNews } from "@/lib/news-store";

export async function GET() {
  try {
    const news = getPublishedNews();
    return NextResponse.json(news);
  } catch {
    return NextResponse.json([]);
  }
}

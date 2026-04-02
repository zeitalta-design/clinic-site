/**
 * 公開用休院日API
 * GET /api/holidays  公開中の休院日のみ返す（認証不要）
 */

import { NextResponse } from "next/server";
import { getPublishedHolidays } from "@/lib/holidays-store";

export async function GET() {
  try {
    return NextResponse.json(getPublishedHolidays());
  } catch {
    return NextResponse.json([]);
  }
}

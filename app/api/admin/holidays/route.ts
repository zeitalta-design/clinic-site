/**
 * 管理用休院日CRUD API
 * GET    /api/admin/holidays     一覧取得（全件）
 * POST   /api/admin/holidays     新規追加
 * PUT    /api/admin/holidays     更新
 * DELETE /api/admin/holidays     削除
 *
 * すべて認証必須
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getHolidays,
  addHoliday,
  updateHoliday,
  deleteHoliday,
  type HolidayType,
} from "@/lib/holidays-store";

async function checkAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }
  return null;
}

const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();

const VALID_TYPES: HolidayType[] = ["休診", "午前休", "午後休", "臨時休診"];

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    return NextResponse.json(getHolidays());
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    const { date, type, label, note, isPublished } = await request.json();
    if (!date || !type) {
      return NextResponse.json(
        { error: "日付と種別は必須です" },
        { status: 400 }
      );
    }
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "無効な種別です" },
        { status: 400 }
      );
    }
    const item = addHoliday({
      date: sanitize(date).slice(0, 10),
      type,
      label: label ? sanitize(label).slice(0, 50) : undefined,
      note: note ? sanitize(note).slice(0, 200) : undefined,
      isPublished: isPublished !== false,
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "追加に失敗しました" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    const { id, date, type, label, note, isPublished } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }
    if (type && !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "無効な種別です" },
        { status: 400 }
      );
    }
    const updated = updateHoliday(id, {
      ...(date !== undefined && { date: sanitize(date).slice(0, 10) }),
      ...(type !== undefined && { type }),
      ...(label !== undefined && {
        label: label ? sanitize(label).slice(0, 50) : undefined,
      }),
      ...(note !== undefined && {
        note: note ? sanitize(note).slice(0, 200) : undefined,
      }),
      ...(isPublished !== undefined && { isPublished }),
    });
    if (!updated) {
      return NextResponse.json(
        { error: "対象が見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }
    const deleted = deleteHoliday(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "対象が見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

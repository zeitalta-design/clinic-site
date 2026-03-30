/**
 * 管理用ニュースCRUD API
 * GET    /api/admin/news     一覧取得（全件、公開/非公開問わず）
 * POST   /api/admin/news     新規追加
 * PUT    /api/admin/news     更新（isPublished切り替え含む）
 * DELETE /api/admin/news     削除
 *
 * すべて認証必須
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getNews, addNews, updateNews, deleteNews } from "@/lib/news-store";

async function checkAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }
  return null;
}

const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    return NextResponse.json(getNews());
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;
  try {
    const { title, date, category, body, isPublished } = await request.json();
    if (!title || !date) {
      return NextResponse.json({ error: "タイトルと日付は必須です" }, { status: 400 });
    }
    const item = addNews({
      title: sanitize(title).slice(0, 100),
      date: sanitize(date).slice(0, 10),
      category: category ? sanitize(category).slice(0, 20) : undefined,
      body: body ? sanitize(body).slice(0, 500) : undefined,
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
    const { id, title, date, category, body, isPublished } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }
    const updated = updateNews(id, {
      ...(title !== undefined && { title: sanitize(title).slice(0, 100) }),
      ...(date !== undefined && { date: sanitize(date).slice(0, 10) }),
      ...(category !== undefined && {
        category: category ? sanitize(category).slice(0, 20) : undefined,
      }),
      ...(body !== undefined && {
        body: body ? sanitize(body).slice(0, 500) : undefined,
      }),
      ...(isPublished !== undefined && { isPublished }),
    });
    if (!updated) {
      return NextResponse.json({ error: "対象が見つかりません" }, { status: 404 });
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
    const deleted = deleteNews(id);
    if (!deleted) {
      return NextResponse.json({ error: "対象が見つかりません" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

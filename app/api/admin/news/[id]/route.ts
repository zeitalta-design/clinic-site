import { NextResponse } from "next/server";
import { updateNewsItem, deleteNewsItem } from "@/lib/admin-news";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updated = await updateNewsItem(id, {
      title: data.title,
      date: data.date,
      content: data.content,
      is_published: data.is_published,
    });

    if (!updated) {
      return NextResponse.json({ error: "更新に失敗しました" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "サーバーエラー";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = await deleteNewsItem(id);
    if (!ok) {
      return NextResponse.json({ error: "削除に失敗しました" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAdminNewsList, createNewsItem } from "@/lib/admin-news";

export async function GET() {
  const news = await getAdminNewsList();
  return NextResponse.json(news);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title?.trim()) {
      return NextResponse.json({ error: "タイトルは必須です" }, { status: 400 });
    }
    if (!data.date?.trim()) {
      return NextResponse.json({ error: "日付は必須です" }, { status: 400 });
    }

    const item = await createNewsItem({
      title: data.title.trim(),
      date: data.date,
      content: data.content?.trim() || "",
      is_published: data.is_published ?? true,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "サーバーエラー";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

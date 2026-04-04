import { NextResponse } from "next/server";
import { getAdminNews, addAdminNews } from "@/lib/admin-news";

export async function GET() {
  const news = getAdminNews();
  return NextResponse.json(news);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title?.trim()) {
      return NextResponse.json(
        { error: "タイトルは必須です" },
        { status: 400 }
      );
    }
    if (!data.date?.trim()) {
      return NextResponse.json(
        { error: "日付は必須です" },
        { status: 400 }
      );
    }

    const newItem = addAdminNews({
      title: data.title.trim(),
      date: data.date,
      content: data.content?.trim() || "",
      isPublished: !!data.isPublished,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}

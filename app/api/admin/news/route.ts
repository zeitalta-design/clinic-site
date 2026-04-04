import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifySessionToken } from "@/lib/auth";
import { getAdminNewsList, createNewsItem } from "@/lib/admin-news";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return token ? verifySessionToken(token) : false;
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }
  const news = await getAdminNewsList();
  return NextResponse.json(news);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

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

    revalidatePath("/");

    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "サーバーエラー";
    console.error("[POST /api/admin/news]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

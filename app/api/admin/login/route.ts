/**
 * 管理画面ログインAPI
 * POST /api/admin/login
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, isAdminEnabled, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAdminEnabled()) {
    return NextResponse.json(
      { error: "管理機能は現在利用できません。環境変数を設定してください。" },
      { status: 503 }
    );
  }

  try {
    const { username, password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "ユーザー名とパスワードを入力してください" },
        { status: 400 }
      );
    }

    const token = verifyCredentials(username || "", password);

    if (!token) {
      return NextResponse.json(
        { error: "ユーザー名またはパスワードが正しくありません" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "リクエストの処理に失敗しました" },
      { status: 500 }
    );
  }
}

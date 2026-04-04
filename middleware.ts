import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ログインページとAPI認証はスルー
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/login/" ||
    pathname.startsWith("/api/admin/")
  ) {
    return NextResponse.next();
  }

  // /admin 配下を保護
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const parts = token.split(".");
    if (parts.length !== 2) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const ts = parseInt(parts[0], 10);
    if (isNaN(ts) || Date.now() - ts > 7 * 24 * 60 * 60 * 1000) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_session");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

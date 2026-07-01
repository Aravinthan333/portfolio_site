import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    const secret = process.env.AUTH_SECRET;

    if (!token || !secret || secret.length < 32) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    const secret = process.env.AUTH_SECRET;
    if (token && secret && secret.length >= 32) {
      try {
        await jwtVerify(token, new TextEncoder().encode(secret));
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        /* not logged in */
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

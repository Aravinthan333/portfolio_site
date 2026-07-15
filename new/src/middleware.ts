import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login") {
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

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

// src/middleware.ts
// Next.js middleware runs on Edge Runtime — cannot use Prisma directly.
// Uses lightweight JWT check via getToken.
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  // Always allow: auth pages, API routes, static assets, error pages
  const isPublic =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/error-") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/");

  if (isPublic) {
    // Redirect already-logged-in users away from signin/signup
    if (isLoggedIn && (pathname === "/signin" || pathname === "/signup")) {
      const dest = role === "USER" ? "/feedback/submit" : "/";
      return NextResponse.redirect(new URL(dest, req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // /feedback/submit is accessible to any authenticated user
  if (pathname.startsWith("/feedback/submit")) {
    if (!isLoggedIn) {
      const url = new URL("/signin", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // All other routes require admin authentication
  if (!isLoggedIn) {
    const url = new URL("/signin", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Regular users (USER role) cannot access the admin dashboard
  if (role === "USER") {
    return NextResponse.redirect(
      new URL("/feedback/submit", req.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};

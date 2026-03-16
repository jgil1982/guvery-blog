// src/middleware.ts
// Next.js middleware runs on Edge Runtime — cannot use Prisma directly.
// Uses lightweight JWT check via getToken.
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require ADMIN role. /feedback/submit is handled separately.
const ADMIN_PREFIXES = [
  "/admin",
  "/feedback",
  "/calendar",
  "/profile",
  "/form-elements",
  "/basic-tables",
  "/blank",
  "/alerts",
  "/avatars",
  "/badge",
  "/buttons",
  "/line-chart",
  "/bar-chart",
  "/videos",
  "/modals",
];

function requiresAdmin(pathname: string): boolean {
  if (pathname.startsWith("/feedback/submit")) return false;
  return ADMIN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  // Always allow: API routes, static assets
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Auth pages — redirect logged-in users to their home
  if (pathname === "/signin" || pathname === "/signup") {
    if (isLoggedIn) {
      const dest = role === "USER" ? "/feedback/submit" : "/admin";
      return NextResponse.redirect(new URL(dest, req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // /feedback/submit — any authenticated user
  if (pathname.startsWith("/feedback/submit")) {
    if (!isLoggedIn) {
      const url = new URL("/signin", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Admin-only routes
  if (requiresAdmin(pathname)) {
    if (!isLoggedIn) {
      const url = new URL("/signin", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role === "USER") {
      return NextResponse.redirect(
        new URL("/feedback/submit", req.nextUrl.origin)
      );
    }
    return NextResponse.next();
  }

  // Everything else is public (blog: /, /[slug], /category/[slug])
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)" ],
};

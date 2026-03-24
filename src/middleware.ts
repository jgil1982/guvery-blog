// src/middleware.ts
// Uses auth.config.ts (edge-compatible, no Prisma) so Next.js Edge Runtime
// can evaluate the JWT session without importing Prisma or bcrypt.
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

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

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!session;
  const role = session?.user?.role as string | undefined;

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
  if (pathname === "/signin") {
    if (isLoggedIn) {
      const dest = role === "USER" ? "/feedback/submit" : "/admin";
      return NextResponse.redirect(new URL(dest, req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // /signup — always accessible
  if (pathname === "/signup") {
    return NextResponse.next();
  }

  // /feedback/submit — auth handled by the page itself via auth()
  if (pathname.startsWith("/feedback/submit")) {
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

  // Everything else is public
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)" ],
};

// src/middleware.ts
// Next.js middleware runs on Edge Runtime — cannot use Prisma directly.
// We use a lightweight JWT check instead of the full auth() function.
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Allow /admin/signin always
  if (pathname.startsWith("/admin/signin")) {
    return NextResponse.next();
  }

  // Protect /admin/* routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const signInUrl = new URL("/admin/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

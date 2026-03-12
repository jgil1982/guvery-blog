// src/middleware.ts
// Next.js 16: renamed from middleware to proxy convention, but
// next-auth still uses the middleware export for auth protection.
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    // Protect all /admin/* routes EXCEPT /admin/signin
    "/admin/((?!signin).*)",
  ],
};

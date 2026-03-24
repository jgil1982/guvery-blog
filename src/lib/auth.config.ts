// src/lib/auth.config.ts
// Edge-compatible auth config — NO Prisma, NO bcrypt.
// Used by middleware (Edge Runtime). Full auth.ts adds Credentials provider.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" } as const,
  pages: {
    signIn: "/signin",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

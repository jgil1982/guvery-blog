// GET /api/articles — public list of published articles
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const categorySlug = searchParams.get("category") ?? undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 20;

  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(categorySlug && { category: { slug: categorySlug } }),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return NextResponse.json(articles);
}

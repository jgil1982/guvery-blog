// GET /api/articles/[slug] — public single article
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { category: { select: { name: true, slug: true } } },
  });

  if (!article) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  return NextResponse.json(article);
}

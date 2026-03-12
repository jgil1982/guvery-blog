// src/app/api/admin/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Update article
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, featuredImage, status, categoryId,
      metaTitle, metaDescription } = body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    const wasPublished = existing.status === "PUBLISHED";
    const willPublish = status === "PUBLISHED";

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        status: willPublish ? "PUBLISHED" : "DRAFT",
        publishedAt: willPublish && !wasPublished ? new Date() : existing.publishedAt,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        categoryId,
      },
    });

    return NextResponse.json(article);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "El slug ya existe." }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// Delete article
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ message: "Artículo eliminado." });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}

// src/app/api/admin/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Create article
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, featuredImage, status, categoryId,
      metaTitle, metaDescription } = body;

    if (!title || !slug || !content || !categoryId) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        categoryId,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "El slug ya existe." }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

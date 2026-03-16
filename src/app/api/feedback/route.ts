// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET — list all feedbacks (admin only)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role === "USER") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "ALL";
  const sortOrder = searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = searchParams.get("search")?.trim() || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const skip = (page - 1) * limit;

  const where = {
    ...(status !== "ALL" && {
      status: status as "VISIBLE" | "HIDDEN",
    }),
    ...(search && {
      OR: [
        { comment: { contains: search, mode: "insensitive" as const } },
        { user: { name: { contains: search, mode: "insensitive" as const } } },
        { user: { email: { contains: search, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [feedbacks, total] = await Promise.all([
    prisma.feedback.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: sortOrder },
      skip,
      take: limit,
    }),
    prisma.feedback.count({ where }),
  ]);

  return NextResponse.json({ feedbacks, total, page, limit });
}

// POST — create feedback (any authenticated user)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { comment, url, imageUrl } = await req.json();

    if (!comment || comment.trim().length < 5) {
      return NextResponse.json(
        { error: "El comentario debe tener al menos 5 caracteres." },
        { status: 400 }
      );
    }

    if (comment.trim().length > 1000) {
      return NextResponse.json(
        { error: "El comentario no puede superar los 1000 caracteres." },
        { status: 400 }
      );
    }

    if (url) {
      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: "La URL proporcionada no es válida." },
          { status: 400 }
        );
      }
    }

    const feedback = await prisma.feedback.create({
      data: {
        comment: comment.trim(),
        url: url?.trim() || null,
        imageUrl: imageUrl || null,
        userId: session.user.id,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("[feedback POST]", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

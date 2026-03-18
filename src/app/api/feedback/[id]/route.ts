// src/app/api/feedback/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE — permanently remove a feedback (admin only)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user?.role === "USER") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.feedback.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Feedback no encontrado." },
      { status: 404 }
    );
  }
}

// PATCH — update comment and/or status (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user?.role === "USER") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { status, comment } = body as { status?: string; comment?: string };

    const data: { status?: string; comment?: string } = {};

    if (status !== undefined) {
      if (!["VISIBLE", "HIDDEN"].includes(status)) {
        return NextResponse.json(
          { error: "Estado inválido. Usa VISIBLE o HIDDEN." },
          { status: 400 }
        );
      }
      data.status = status;
    }

    if (comment !== undefined) {
      if (comment.trim().length < 5) {
        return NextResponse.json(
          { error: "El comentario debe tener al menos 5 caracteres." },
          { status: 400 }
        );
      }
      data.comment = comment.trim();
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Nada que actualizar." },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(feedback);
  } catch {
    return NextResponse.json(
      { error: "Feedback no encontrado." },
      { status: 404 }
    );
  }
}

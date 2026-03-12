// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "El email es requerido." }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "El formato del email no es válido." }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.status === "ACTIVE") {
        return NextResponse.json(
          { error: "Este email ya está suscrito." },
          { status: 409 }
        );
      }
      // Re-activate if previously unsubscribed
      await prisma.subscriber.update({
        where: { email },
        data: { status: "ACTIVE", unsubscribedAt: null, subscribedAt: new Date() },
      });
      return NextResponse.json({ message: "Suscripción reactivada." }, { status: 200 });
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: {
        email,
        source: req.headers.get("referer") ? "blog" : "direct",
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ message: "Suscripción exitosa." }, { status: 201 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// src/app/(admin)/admin/blog/reviews/[id]/edit/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditFeedbackForm from "@/components/admin/EditFeedbackForm";

export const metadata: Metadata = { title: "Editar reseña — Admin Guvery" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditReviewPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/signin");

  const { id } = await params;

  const feedback = await prisma.feedback.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!feedback) notFound();

  return (
    <div className="max-w-2xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/admin/blog/reviews" className="hover:text-gray-700 dark:hover:text-gray-300">
          Reseñas
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Editar reseña</span>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Editar reseña</h1>

        <EditFeedbackForm
          id={feedback.id}
          initialComment={feedback.comment}
          initialStatus={feedback.status as "VISIBLE" | "HIDDEN"}
          authorName={feedback.user.name ?? ""}
          authorEmail={feedback.user.email}
        />
      </div>
    </div>
  );
}

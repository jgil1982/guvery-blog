// src/app/(admin)/admin/blog/[id]/edit/page.tsx
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "Editar artículo — Admin Guvery Blog" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/signin");

  const { id } = await params;

  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar artículo</h1>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.title}</p>
      </div>
      <ArticleForm categories={categories} article={article} />
    </div>
  );
}

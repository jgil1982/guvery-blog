// src/app/(admin)/admin/blog/new/page.tsx
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "Nuevo artículo — Admin Guvery Blog" };

export default async function NewArticlePage() {
  const session = await auth();
  if (!session) redirect("/admin/signin");

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nuevo artículo</h1>
        <p className="text-sm text-gray-500 mt-1">Crea y publica un nuevo artículo en el blog</p>
      </div>
      <ArticleForm categories={categories} />
    </div>
  );
}

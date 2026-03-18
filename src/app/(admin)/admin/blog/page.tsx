// src/app/(admin)/admin/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export const metadata: Metadata = { title: "Artículos — Admin Guvery Blog" };

const PAGE_SIZE = 8;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

async function getArticles(page: number) {
  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.article.count(),
  ]);
  return { articles, total };
}

export default async function AdminBlogPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) redirect("/signin");

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { articles, total } = await getArticles(page);
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const clampedPage = Math.min(page, Math.max(totalPages, 1));

  const from = total === 0 ? 0 : (clampedPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(clampedPage * PAGE_SIZE, total);

  // Build visible page numbers (max 5 around current)
  const pageNumbers: number[] = [];
  const delta = 2;
  const left = Math.max(1, clampedPage - delta);
  const right = Math.min(totalPages, clampedPage + delta);
  for (let i = left; i <= right; i++) pageNumbers.push(i);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artículos</h1>
          <p className="text-sm text-gray-500 mt-1">{total} artículos en total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Nuevo artículo
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Título</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Categoría</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Estado</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">
                    {article.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">/{article.slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {article.category.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      article.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {article.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/blog/${article.id}/edit`}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Editar
                    </Link>
                    {article.status === "PUBLISHED" && (
                      <Link
                        href={`/${article.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-600 text-xs"
                      >
                        Ver
                      </Link>
                    )}
                    <DeleteArticleButton id={article.id} />
                  </div>
                </td>
              </tr>
            ))}

            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-16 text-gray-400">
                  <p>No hay artículos todavía.</p>
                  <Link href="/admin/blog/new" className="mt-3 inline-block text-blue-600 hover:underline text-sm">
                    Crear el primero
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {/* Info */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-medium text-gray-700 dark:text-gray-200">{from}–{to}</span> de{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">{total}</span> artículos
            </p>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {/* Prev */}
              <Link
                href={`?page=${clampedPage - 1}`}
                aria-disabled={clampedPage === 1}
                className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  clampedPage === 1
                    ? "pointer-events-none border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                ← Anterior
              </Link>

              {/* First page + ellipsis */}
              {left > 1 && (
                <>
                  <Link href="?page=1" className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    1
                  </Link>
                  {left > 2 && <span className="px-1 text-gray-400 text-xs">…</span>}
                </>
              )}

              {/* Page numbers */}
              {pageNumbers.map((n) => (
                <Link
                  key={n}
                  href={`?page=${n}`}
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    n === clampedPage
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {n}
                </Link>
              ))}

              {/* Last page + ellipsis */}
              {right < totalPages && (
                <>
                  {right < totalPages - 1 && <span className="px-1 text-gray-400 text-xs">…</span>}
                  <Link href={`?page=${totalPages}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {totalPages}
                  </Link>
                </>
              )}

              {/* Next */}
              <Link
                href={`?page=${clampedPage + 1}`}
                aria-disabled={clampedPage === totalPages}
                className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  clampedPage === totalPages
                    ? "pointer-events-none border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Siguiente →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

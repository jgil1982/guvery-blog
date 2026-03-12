// src/app/(admin)/admin/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export const metadata: Metadata = { title: "Artículos — Admin Guvery Blog" };

async function getArticles() {
  return prisma.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminBlogPage() {
  const session = await auth();
  if (!session) redirect("/admin/signin");

  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artículos</h1>
          <p className="text-sm text-gray-500 mt-1">{articles.length} artículos en total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Nuevo artículo
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {articles.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No hay artículos todavía.</p>
            <Link href="/admin/blog/new" className="mt-3 inline-block text-blue-600 hover:underline text-sm">
              Crear el primero
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Título</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Categoría</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Fecha</th>
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
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(article.createdAt).toLocaleDateString("es-PE")}
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
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

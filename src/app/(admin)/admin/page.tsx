// src/app/(admin)/admin/page.tsx
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | Guvery Blog",
  description: "Panel de administración del blog de Guvery",
};

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  const [totalArticles, publishedArticles, draftArticles, totalSubscribers, activeSubscribers, categories] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { status: "ACTIVE" } }),
      prisma.category.count(),
    ]);

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const stats = [
    { label: "Artículos publicados", value: publishedArticles, sub: `${draftArticles} borradores`, href: "/admin/blog", color: "bg-blue-50 text-blue-600" },
    { label: "Suscriptores activos", value: activeSubscribers, sub: `${totalSubscribers} en total`, href: "/admin/subscribers", color: "bg-green-50 text-green-600" },
    { label: "Categorías", value: categories, sub: "grupos de contenido", href: "/admin/blog", color: "bg-purple-50 text-purple-600" },
    { label: "Total artículos", value: totalArticles, sub: "publicados + borradores", href: "/admin/blog", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bienvenido, {session.user?.name ?? session.user?.email} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Panel de administración — Guvery Blog
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color} inline-block px-3 py-1 rounded-xl`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-400">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Nuevo artículo
        </Link>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Ver todos los artículos
        </Link>
        <Link
          href="/admin/subscribers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Ver suscriptores
        </Link>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Ver blog público ↗
        </Link>
      </div>

      {/* Recent articles */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Artículos recientes
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {recentArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No hay artículos todavía.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Título</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 hidden md:table-cell">Categoría</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Estado</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-5 py-3">
                      <span className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs block">
                        {article.title}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {article.category.name}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        article.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {article.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/blog/${article.id}/edit`}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

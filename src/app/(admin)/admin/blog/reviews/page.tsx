// src/app/(admin)/admin/blog/reviews/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteFeedbackButton from "@/components/admin/DeleteFeedbackButton";

export const metadata: Metadata = { title: "Reseñas — Admin Guvery Blog" };

const PAGE_SIZE = 5;

interface PageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

async function getFeedback(page: number, statusFilter: string) {
  const where =
    statusFilter === "HIDDEN"
      ? { status: "HIDDEN" as const }
      : statusFilter === "VISIBLE"
      ? { status: "VISIBLE" as const }
      : {};

  const [rows, total] = await Promise.all([
    prisma.feedback.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.feedback.count({ where }),
  ]);

  return { rows, total };
}

export default async function AdminReviewsPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) redirect("/signin");

  const { page: pageParam, status: statusParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const statusFilter = ["VISIBLE", "HIDDEN"].includes(statusParam ?? "")
    ? (statusParam as string)
    : "all";

  const { rows, total } = await getFeedback(page, statusFilter);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const from = total === 0 ? 0 : (clampedPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(clampedPage * PAGE_SIZE, total);

  const [visibleCount, hiddenCount, allCount] = await Promise.all([
    prisma.feedback.count({ where: { status: "VISIBLE" } }),
    prisma.feedback.count({ where: { status: "HIDDEN" } }),
    prisma.feedback.count(),
  ]);

  function buildHref(params: Record<string, string>) {
    const q = new URLSearchParams({ page: "1", status: statusFilter, ...params });
    return `?${q.toString()}`;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reseñas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Reseñas de usuarios visibles en{" "}
            <Link href="/blog" target="_blank" className="text-blue-600 hover:underline">
              /blog
            </Link>
          </p>
        </div>
        <Link
          href="/blog"
          target="_blank"
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Ver blog público →
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: "all", label: "Todas", count: allCount },
          { key: "VISIBLE", label: "Visibles", count: visibleCount },
          { key: "HIDDEN", label: "Ocultas", count: hiddenCount },
        ].map(({ key, label, count }) => (
          <Link
            key={key}
            href={buildHref({ status: key })}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              statusFilter === key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {label}
            <span className={`ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs ${
              statusFilter === key
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            }`}>
              {count}
            </span>
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Usuario</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Reseña</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Fecha</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Estado</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                      {(feedback.user.name ?? feedback.user.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-xs">
                        {feedback.user.name ?? "Sin nombre"}
                      </div>
                      <div className="text-xs text-gray-400">{feedback.user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Comment */}
                <td className="px-6 py-4 max-w-sm">
                  <p className="text-gray-700 dark:text-gray-300 text-xs line-clamp-2 leading-relaxed">
                    {feedback.comment}
                  </p>
                  {feedback.url && (
                    <a
                      href={feedback.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-blue-500 hover:underline truncate max-w-[200px]"
                    >
                      {feedback.url}
                    </a>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {feedback.createdAt.toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      feedback.status === "VISIBLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {feedback.status === "VISIBLE" ? "Visible" : "Oculta"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/blog/reviews/${feedback.id}/edit`}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Editar
                    </Link>
                    <DeleteFeedbackButton id={feedback.id} />
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400">
                  <p>No hay reseñas{statusFilter !== "all" ? ` con estado "${statusFilter === "VISIBLE" ? "Visible" : "Oculta"}"` : ""} todavía.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mostrando{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">{from}–{to}</span>{" "}
              de{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">{total}</span> reseñas
            </p>

            <div className="flex items-center gap-1">
              <Link
                href={`?page=${clampedPage - 1}&status=${statusFilter}`}
                aria-disabled={clampedPage === 1}
                className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  clampedPage === 1
                    ? "pointer-events-none border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                ← Anterior
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === totalPages || Math.abs(n - clampedPage) <= 1)
                .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                  if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(n);
                  return acc;
                }, [])
                .map((n, idx) =>
                  n === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 text-xs">…</span>
                  ) : (
                    <Link
                      key={n}
                      href={`?page=${n}&status=${statusFilter}`}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                        n === clampedPage
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {n}
                    </Link>
                  )
                )}

              <Link
                href={`?page=${clampedPage + 1}&status=${statusFilter}`}
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

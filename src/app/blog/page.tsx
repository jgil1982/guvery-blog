// src/app/blog/page.tsx  — Página pública de reseñas (/blog)
// Usa datos mock (sin base de datos).
import { Metadata } from "next";
import Link from "next/link";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogList from "@/components/blog/BlogList";
import { mockPosts } from "@/lib/mockPosts";
import { mockArticles } from "@/lib/mockArticles";

export const metadata: Metadata = {
  title: "Reseñas de la comunidad — Guvery Blog",
  description:
    "Lee las experiencias reales de usuarios y administradores que usan Guvery para comprar desde el extranjero.",
  openGraph: {
    title: "Reseñas de la comunidad — Guvery Blog",
    description: "Experiencias reales de usuarios que compran con Guvery.",
    type: "website",
    siteName: "Guvery Blog",
  },
};

export default function BlogReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BlogHeader />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4">
              Comunidad Guvery
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Reseñas de la comunidad
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Experiencias reales de usuarios y administradores que confían en Guvery
              para comprar desde el extranjero.
            </p>

            {/* Stats */}
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{mockPosts.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Reseñas</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {mockPosts.filter((p) => p.role === "USER").length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">De usuarios</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {mockPosts.filter((p) => p.role === "ADMIN" || p.role === "SUPER_ADMIN").length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Del equipo</p>
              </div>
            </div>
          </div>

          {/* ── Elige un artículo para reseñar ───────────────────────── */}
          <section className="mb-14">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Elige un artículo para dejar tu reseña
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Selecciona el tema que mejor describe tu experiencia con Guvery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockArticles.map((article) => (
                <div
                  key={article.id}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Category badge */}
                  <span className="inline-flex self-start px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-3">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime} lectura
                    </span>
                    <Link
                      href={`/feedback/submit?article=${article.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Reseñar
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA general */}
            <div className="mt-6 text-center">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Escribe tu reseña →
              </Link>
              <Link
                href="/"
                className="ml-3 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Ver artículos
              </Link>
            </div>
          </section>

          {/* ── Divider ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Reseñas publicadas
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Lista de reseñas ─────────────────────────────────────── */}
          <BlogList posts={mockPosts} />

        </div>
      </main>

      <BlogFooter />
    </div>
  );
}

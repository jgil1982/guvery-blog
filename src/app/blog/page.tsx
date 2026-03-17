// src/app/blog/page.tsx  — Página pública de reseñas (/blog)
// Usa datos mock (sin base de datos).
import { Metadata } from "next";
import Link from "next/link";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogList from "@/components/blog/BlogList";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { mockPosts } from "@/lib/mockPosts";

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

          {/* Hero */}
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

            {/* CTA */}
            <div className="mt-8">
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
          </div>

          {/* Lista de reseñas */}
          <BlogList posts={mockPosts} />

          {/* Newsletter */}
          <div className="mt-16">
            <NewsletterForm />
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}

// src/app/page.tsx  — Public blog home (served at /)
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import NewsletterForm from "@/components/blog/NewsletterForm";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import SearchInput from "@/components/blog/SearchInput";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Guvery Blog — Comparte tu experiencia con Guvery",
  description:
    "Esta es tu oportunidad de dejar tu feedback. Escribe una reseña o artículo sobre tu experiencia comprando con Guvery.",
  openGraph: {
    title: "Guvery Blog — Comparte tu experiencia con Guvery",
    description:
      "Esta es tu oportunidad de dejar tu feedback. Escribe una reseña o artículo sobre tu experiencia comprando con Guvery.",
    type: "website",
    siteName: "Guvery Blog",
  },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getArticles(query?: string) {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function BlogHomePage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const articles = await getArticles(q);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BlogHeader />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Esta es tu oportunidad
              <br />
              <span className="text-[#00594f]">de dejar tu feedback</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Escribe una reseña o artículo sobre tu experiencia con Guvery.
              Tu opinión ayuda a otros usuarios a conocer el servicio.
            </p>

            {/* Search */}
            <div className="mt-8 flex justify-center">
              <Suspense>
                <SearchInput defaultValue={q ?? ""} />
              </Suspense>
            </div>

            {/* CTA login */}
            <div className="mt-6">
              <Link
                href="/feedback/submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00594f] text-white font-semibold text-sm hover:bg-[#007a6c] transition-colors"
              >
                Escribe tu reseña →
              </Link>
            </div>
          </div>

          {/* ── Elige un artículo para reseñar ───────────────────────── */}
          {articles.length > 0 && (
            <section className="mb-14">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Elige un artículo para dejar tu reseña
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Selecciona el tema que mejor describe tu experiencia con Guvery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {articles.map((article) => {
                  const readMin = Math.max(1, Math.ceil(article.content.split(" ").length / 200));
                  return (
                    <div
                      key={article.id}
                      className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* Imagen */}
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={article.featuredImage ?? "https://picsum.photos/seed/placeholder/600/300"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#00594f] text-xs font-semibold shadow-sm">
                          {article.category.name}
                        </span>
                      </div>

                      {/* Contenido */}
                      <div className="flex flex-col flex-1 p-4">
                        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#00594f] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                          {article.excerpt ?? ""}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <Link
                            href={`/${article.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00594f] hover:text-[#007a6c] hover:underline transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {readMin} min · Leer
                          </Link>
                          <Link
                            href={`/feedback/submit?article=${article.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00594f] text-white text-xs font-semibold hover:bg-[#007a6c] transition-colors"
                          >
                            Reseñar
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Search results label */}
          {q && (
            <p className="mb-6 text-sm text-gray-500">
              {articles.length === 0
                ? `Sin resultados para "${q}"`
                : `${articles.length} resultado${articles.length !== 1 ? "s" : ""} para "${q}"`}
            </p>
          )}

          {/* Empty state when search returns nothing */}
          {q && articles.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No se encontraron artículos para &ldquo;{q}&rdquo;.</p>
            </div>
          )}

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

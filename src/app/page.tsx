// src/app/page.tsx  — Public blog home (served at /)
import { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/blog/ArticleCard";
import NewsletterForm from "@/components/blog/NewsletterForm";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import SearchInput from "@/components/blog/SearchInput";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Guvery Blog — Guías para comprar en USA desde Perú",
  description:
    "Aprende a comprar en Amazon, eBay y más tiendas de USA desde Perú con Guvery. Guías de compra, comparativas y consejos para importaciones personales.",
  openGraph: {
    title: "Guvery Blog — Guías para comprar en USA desde Perú",
    description:
      "Aprende a comprar en Amazon, eBay y más tiendas de USA desde Perú con Guvery.",
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
              Compra en USA desde Perú
              <br />
              <span className="text-blue-600">sin complicaciones</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Guías, comparativas y consejos para importar productos de USA a
              Perú usando Guvery — el marketplace que conecta compradores con
              viajeros.
            </p>

            {/* Search */}
            <div className="mt-8 flex justify-center">
              <Suspense>
                <SearchInput defaultValue={q ?? ""} />
              </Suspense>
            </div>
          </div>

          {/* Search results label */}
          {q && (
            <p className="mb-6 text-sm text-gray-500">
              {articles.length === 0
                ? `Sin resultados para "${q}"`
                : `${articles.length} resultado${articles.length !== 1 ? "s" : ""} para "${q}"`}
            </p>
          )}

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">
                {q ? `No se encontraron artículos para "${q}".` : "No hay artículos publicados todavía."}
              </p>
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

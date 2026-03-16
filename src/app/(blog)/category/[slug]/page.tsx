// src/app/(blog)/category/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/blog/ArticleCard";
import NewsletterForm from "@/components/blog/NewsletterForm";

export const revalidate = 3600; // ISR: revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Static generation ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((c) => ({ slug: c.slug }));
}

// ── Dynamic metadata ───────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) return { title: "Categoría no encontrada" };

  return {
    title: `${category.name} — Guvery Blog`,
    description:
      category.description ??
      `Artículos sobre ${category.name} en Guvery Blog.`,
    openGraph: {
      title: `${category.name} — Guvery Blog`,
      description:
        category.description ??
        `Artículos sobre ${category.name} en Guvery Blog.`,
      type: "website",
      siteName: "Guvery Blog",
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600">Inicio</Link>
        <span>/</span>
        <span className="text-gray-600">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-3 text-lg text-gray-500">{category.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-400">
          {category.articles.length}{" "}
          {category.articles.length === 1 ? "artículo" : "artículos"}
        </p>
      </div>

      {/* Articles */}
      {category.articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No hay artículos en esta categoría todavía.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Ver todos los artículos
          </Link>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterForm />
      </div>
    </div>
  );
}

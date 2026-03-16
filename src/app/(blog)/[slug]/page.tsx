// src/app/(blog)/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { prisma } from "@/lib/prisma";
import NewsletterForm from "@/components/blog/NewsletterForm";

export const revalidate = 3600; // ISR: revalidate every hour

// Configure marked for safe rendering
marked.setOptions({ gfm: true, breaks: true });

// ── Types ──────────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Static generation ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return articles.map((a) => ({ slug: a.slug }));
}

// ── Dynamic metadata ───────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!article) return { title: "Artículo no encontrado" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt ?? undefined,
    openGraph: {
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt ?? undefined,
      type: "article",
      url: `${siteUrl}/${article.slug}`,
      siteName: "Guvery Blog",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.featuredImage
        ? [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }]
        : [],
    },
    alternates: {
      canonical: `${siteUrl}/${article.slug}`,
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { category: true },
  });

  if (!article) notFound();

  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt ?? article.metaDescription ?? "",
    image: article.featuredImage ?? undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Guvery",
      url: "https://guvery.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Guvery Blog",
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${article.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Inicio</Link>
          <span>/</span>
          <Link
            href={`/category/${article.category.slug}`}
            className="hover:text-gray-600"
          >
            {article.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Category */}
        <Link
          href={`/category/${article.category.slug}`}
          className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 hover:text-blue-800"
        >
          {article.category.name}
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>

        {/* Meta */}
        {publishDate && (
          <p className="mt-4 text-sm text-gray-400">{publishDate}</p>
        )}

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative mt-8 h-64 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="mt-10 prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
            prose-table:text-sm"
          dangerouslySetInnerHTML={{
            __html: marked.parse(article.content) as string,
          }}
        />

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterForm />
        </div>
      </article>
    </>
  );
}

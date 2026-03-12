// src/components/blog/ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Article, Category } from "@prisma/client";

type ArticleWithCategory = Article & {
  category: Category;
};

interface ArticleCardProps {
  article: ArticleWithCategory;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      {article.featuredImage ? (
        <Link href={`/${article.slug}`} className="block overflow-hidden">
          <div className="relative h-48 w-full bg-gray-100">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100" />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <Link
          href={`/category/${article.category.slug}`}
          className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3 hover:text-blue-800"
        >
          {article.category.name}
        </Link>

        {/* Title */}
        <Link href={`/${article.slug}`}>
          <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-3 flex-1">
            {article.excerpt}
          </p>
        )}

        {/* Date */}
        {publishDate && (
          <p className="mt-4 text-xs text-gray-400">{publishDate}</p>
        )}
      </div>
    </article>
  );
}

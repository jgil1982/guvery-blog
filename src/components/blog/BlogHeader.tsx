// src/components/blog/BlogHeader.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function BlogHeader() {
  const categories = await getCategories();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              Guvery
              <span className="text-brand-500 ml-1">Blog</span>
            </span>
          </Link>

          {/* Nav: Categories */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Inicio
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="https://guvery.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Ir a Guvery →
          </a>
        </div>
      </div>
    </header>
  );
}

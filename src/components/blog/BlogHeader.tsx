import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MobileMenu from "./MobileMenu";

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function BlogHeader() {
  const categories = await getCategories();

  const navLinks = [
    { label: "Inicio", href: "/" },
    ...categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
  ];

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-gray-900">
              Guvery<span className="text-blue-600 ml-1">Blog</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Login button */}
            <Link
              href="/signin"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Iniciar sesión
            </Link>

            {/* Desktop CTA */}
            <a
              href="https://guvery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ir a Guvery →
            </a>

            {/* Mobile hamburger */}
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}

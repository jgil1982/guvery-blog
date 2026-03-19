import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import MobileMenu from "./MobileMenu";
import CategoriesDropdown from "./CategoriesDropdown";
import BlogSignOutButton from "./BlogSignOutButton";

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function BlogHeader({ showCategories = true }: { showCategories?: boolean }) {
  const [categories, session] = await Promise.all([
    showCategories ? getCategories() : Promise.resolve([]),
    auth(),
  ]);

  const isLoggedIn = !!session?.user;
  const role = session?.user?.role as string | undefined;
  const userName = session?.user?.name ?? session?.user?.email ?? "Mi cuenta";
  const firstName = userName.split(" ")[0];
  const userDest = role === "USER" ? "/feedback/submit" : "/admin";

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/favicon.ico" alt="Guvery" width={28} height={28} />
            <span className="text-xl font-bold text-gray-900">
              Guvery<span className="text-[#00594f] ml-1">Blog</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Inicio
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Reseñas
            </Link>
            {showCategories && <CategoriesDropdown categories={categories} />}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href={userDest}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#00594f] text-white text-xs font-bold flex items-center justify-center">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                  {firstName}
                </Link>
                <BlogSignOutButton />
              </>
            ) : (
              <Link
                href="/signin"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}

            {/* Desktop CTA */}
            <a
              href="https://guvery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#00594f] text-white text-sm font-medium hover:bg-[#007a6c] transition-colors"
            >
              Ir a Guvery →
            </a>

            {/* Mobile hamburger */}
            <MobileMenu
              categories={categories}
              isLoggedIn={isLoggedIn}
              userName={firstName}
              userDest={userDest}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

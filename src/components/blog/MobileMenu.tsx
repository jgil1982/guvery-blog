"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Category {
  slug: string;
  name: string;
}

interface MobileMenuProps {
  categories: Category[];
  isLoggedIn: boolean;
  userName: string;
  userDest: string;
}

export default function MobileMenu({ categories, isLoggedIn, userName, userDest }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Abrir menú"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Reseñas
            </Link>

            {/* Categorías accordion — solo si hay categorías */}
            {categories.length > 0 && (
              <>
                <button
                  onClick={() => setCatsOpen((prev) => !prev)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                >
                  Categorías
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${catsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {catsOpen && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-gray-100 pl-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-[#e8f5f3] hover:text-[#00594f] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  href={userDest}
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                >
                  Hola, {userName}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium text-center hover:bg-gray-50 transition-colors w-full"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium text-center hover:bg-gray-50 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
            <a
              href="https://guvery.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 px-4 py-2.5 rounded-lg bg-[#00594f] text-white text-sm font-medium text-center hover:bg-[#007a6c] transition-colors"
            >
              Ir a Guvery →
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

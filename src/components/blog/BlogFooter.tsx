// src/components/blog/BlogFooter.tsx
import Link from "next/link";

export default function BlogFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              Guvery Blog
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Aprende a comprar productos de USA desde Perú. Guías, comparativas
              y todo lo que necesitas saber sobre importaciones personales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Categorías
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/category/guias-de-compra"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Guías de Compra
                </Link>
              </li>
              <li>
                <Link
                  href="/category/comparativas"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Comparativas
                </Link>
              </li>
              <li>
                <Link
                  href="/category/como-funciona-guvery"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Cómo Funciona Guvery
                </Link>
              </li>
            </ul>
          </div>

          {/* Guvery */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Guvery
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://guvery.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="https://guvery.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  ¿Cómo funciona?
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          © {year} Guvery. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

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
              El espacio de la comunidad Guvery para compartir reseñas,
              experiencias y opiniones sobre el servicio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Blog
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                  Artículos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
                  Reseñas de la comunidad
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-sm text-gray-500 hover:text-gray-900">
                  Escribe tu reseña
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
                  href="https://guvery.com/#comofunciona"
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

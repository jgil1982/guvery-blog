// src/app/not-found.tsx
import Link from "next/link";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BlogHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-blue-600">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Página no encontrada
          </h1>
          <p className="mt-3 text-gray-500">
            Lo sentimos, no pudimos encontrar la página que buscas.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver al blog
          </Link>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}

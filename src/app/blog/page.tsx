// src/app/blog/page.tsx  — Página pública de reseñas (/blog)
// Carga reseñas publicadas desde la base de datos.
import { Metadata } from "next";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogList from "@/components/blog/BlogList";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { prisma } from "@/lib/prisma";
import type { MockPost, MockPostRole } from "@/lib/mockPosts";

export const revalidate = 60; // ISR: revalidar cada 60 segundos

export const metadata: Metadata = {
  title: "Reseñas de la comunidad — Guvery Blog",
  description:
    "Lee las experiencias reales de usuarios y administradores que usan Guvery para comprar desde el extranjero.",
  openGraph: {
    title: "Reseñas de la comunidad — Guvery Blog",
    description: "Experiencias reales de usuarios que compran con Guvery.",
    type: "website",
    siteName: "Guvery Blog",
  },
};

async function getPosts(): Promise<MockPost[]> {
  const rows = await prisma.feedback.findMany({
    where: { status: "VISIBLE" },
    include: { user: { select: { name: true, email: true, role: true } } },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((f) => {
    const firstLine = f.comment.split("\n")[0].slice(0, 80);
    return {
      id: f.id,
      title: firstLine.length < f.comment.length ? firstLine + "…" : firstLine,
      content: f.comment,
      excerpt: f.comment.slice(0, 180) + (f.comment.length > 180 ? "…" : ""),
      author: f.user.name ?? f.user.email,
      role: f.user.role as MockPostRole,
      createdAt: f.createdAt.toISOString().split("T")[0],
    };
  });
}

export default async function BlogReviewsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BlogHeader showCategories={false} />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5f3] text-[#00594f] text-xs font-semibold uppercase tracking-wide mb-4">
              Comunidad Guvery
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Reseñas de la comunidad
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Experiencias reales de usuarios y administradores que confían en Guvery
              para comprar desde el extranjero.
            </p>

            {/* Stats */}
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Reseñas</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter((p) => p.role === "USER").length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">De usuarios</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter((p) => p.role === "ADMIN" || p.role === "SUPER_ADMIN").length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Del equipo</p>
              </div>
            </div>
          </div>

          {/* ── Divider ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Reseñas publicadas
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Lista de reseñas ─────────────────────────────────────── */}
          <BlogList posts={posts} />

          {/* ── Newsletter ───────────────────────────────────────────── */}
          <div className="mt-16">
            <NewsletterForm />
          </div>

        </div>
      </main>

      <BlogFooter />
    </div>
  );
}

"use client";
// src/components/blog/BlogList.tsx
// Grid de cards con skeleton loading simulado.

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { MockPost, MockPostRole } from "@/lib/mockPosts";

// ── Skeleton card ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-16 rounded-full bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-5/6 rounded bg-gray-100" />
          <div className="h-3 w-4/6 rounded bg-gray-100" />
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// ── Filtro por rol ─────────────────────────────────────────────────────────
type FilterRole = "ALL" | MockPostRole;

const FILTER_OPTIONS: { value: FilterRole; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "USER", label: "Usuarios" },
];

// ── Estado vacío ───────────────────────────────────────────────────────────
function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <p className="text-lg font-medium text-gray-500">
        {filtered ? "Sin reseñas para este filtro" : "No hay reseñas publicadas todavía"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        {filtered
          ? "Prueba seleccionando otro tipo de usuario."
          : "Sé el primero en compartir tu experiencia con Guvery."}
      </p>
      {!filtered && (
        <a
          href="/signin"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00594f] text-white text-sm font-semibold hover:bg-[#007a6c] transition-colors"
        >
          Escribe tu reseña →
        </a>
      )}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function BlogList({ posts }: { posts: MockPost[] }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterRole>("ALL");

  // Simula carga (800 ms) para mostrar skeleton
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    filter === "ALL" ? posts : posts.filter((p) => p.role === filter);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filtros por rol */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === opt.value
                ? "bg-[#00594f] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {opt.label}
            {opt.value !== "ALL" && (
              <span className="ml-1.5 opacity-60">
                ({posts.filter((p) => p.role === opt.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Contador */}
      {filtered.length > 0 && (
        <p className="text-sm text-gray-400 mb-5">
          {filtered.length} reseña{filtered.length !== 1 ? "s" : ""}
          {filter !== "ALL" ? ` de tipo "${FILTER_OPTIONS.find((o) => o.value === filter)?.label}"` : ""}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <EmptyState filtered={filter !== "ALL"} />
        ) : (
          filtered.map((post) => <BlogCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

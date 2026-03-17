"use client";
// src/components/blog/BlogCard.tsx
// Card para mostrar una reseña mock. Incluye expand/collapse de contenido.

import { useState } from "react";
import type { MockPost, MockPostRole } from "@/lib/mockPosts";

// ── Badge de rol ───────────────────────────────────────────────────────────
const ROLE_STYLES: Record<MockPostRole, { label: string; className: string }> = {
  USER: {
    label: "Usuario",
    className: "bg-gray-100 text-gray-600 border border-gray-200",
  },
  ADMIN: {
    label: "Admin",
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  SUPER_ADMIN: {
    label: "Super Admin",
    className: "bg-purple-100 text-purple-700 border border-purple-200",
  },
};

function RoleBadge({ role }: { role: MockPostRole }) {
  const { label, className } = ROLE_STYLES[role] ?? ROLE_STYLES.USER;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Componente principal ───────────────────────────────────────────────────
export default function BlogCard({ post }: { post: MockPost }) {
  const [expanded, setExpanded] = useState(false);

  const displayContent = expanded
    ? post.content
    : post.excerpt;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      {/* Color bar por rol */}
      <div
        className={`h-1 w-full ${
          post.role === "SUPER_ADMIN"
            ? "bg-purple-500"
            : post.role === "ADMIN"
            ? "bg-blue-500"
            : "bg-gray-300"
        }`}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Header: rol + fecha */}
        <div className="flex items-center justify-between mb-3">
          <RoleBadge role={post.role} />
          <time className="text-xs text-gray-400">{formatDate(post.createdAt)}</time>
        </div>

        {/* Título */}
        <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h2>

        {/* Contenido */}
        <p
          className={`text-sm text-gray-500 leading-relaxed flex-1 whitespace-pre-line ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {displayContent}
        </p>

        {/* Footer: autor + botón */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          {/* Autor */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>

          {/* Botón Leer más / Ver menos */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {expanded ? (
              <>
                Ver menos
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Leer más
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

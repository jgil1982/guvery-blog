// src/components/admin/ArticleForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article, ArticleStatus, Category } from "@prisma/client";

interface ArticleFormProps {
  categories: Category[];
  article?: Article;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ArticleForm({ categories, article }: ArticleFormProps) {
  const router = useRouter();
  const isEditing = !!article;

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    featuredImage: article?.featuredImage ?? "",
    categoryId: article?.categoryId ?? (categories[0]?.id ?? ""),
    status: (article?.status ?? "DRAFT") as ArticleStatus,
    metaTitle: article?.metaTitle ?? "",
    metaDescription: article?.metaDescription ?? "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  }

  async function handleSubmit(e: React.FormEvent, publishNow?: boolean) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      status: publishNow ? "PUBLISHED" : form.status,
    };

    const url = isEditing
      ? `/api/admin/articles/${article!.id}`
      : "/api/admin/articles";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al guardar.");
        setSaving(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Error de conexión.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Título *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cómo comprar en Amazon desde Perú"
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1.5">
              Slug (URL) *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="como-comprar-en-amazon-desde-peru"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Extracto
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Breve descripción que aparece en las tarjetas de artículo..."
            />
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Contenido * <span className="font-normal text-gray-400">(Markdown o HTML)</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={20}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="## Título&#10;&#10;Escribe tu contenido aquí..."
            />
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">SEO</h3>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Meta título
            </label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título optimizado para buscadores (max 60 chars)"
              maxLength={60}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1.5">
              Meta descripción
            </label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Descripción para buscadores (max 160 chars)"
              maxLength={160}
            />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Publicación
            </h3>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Estado
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ArticleStatus })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
            </select>

            <div className="mt-4 space-y-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar"}
              </button>

              {!isEditing && form.status !== "PUBLISHED" && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                  className="w-full py-2 px-4 rounded-lg border border-green-600 text-green-600 text-sm font-semibold hover:bg-green-50 transition-colors disabled:opacity-60"
                >
                  Guardar y publicar
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Categoría *
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Imagen destacada (URL)
            </label>
            <input
              type="url"
              value={form.featuredImage}
              onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
            {form.featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.featuredImage}
                alt="Preview"
                className="mt-3 w-full h-32 object-cover rounded-lg"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

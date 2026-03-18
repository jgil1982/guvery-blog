// src/components/admin/EditFeedbackForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  initialComment: string;
  initialStatus: "VISIBLE" | "HIDDEN";
  authorName: string;
  authorEmail: string;
}

export default function EditFeedbackForm({
  id,
  initialComment,
  initialStatus,
  authorName,
  authorEmail,
}: Props) {
  const router = useRouter();
  const [comment, setComment] = useState(initialComment);
  const [status, setStatus] = useState<"VISIBLE" | "HIDDEN">(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, status }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Error al guardar.");
      return;
    }

    router.push("/admin/blog/reviews");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Author info (read-only) */}
      <div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
          {(authorName || authorEmail).charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white text-sm">{authorName || "Sin nombre"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{authorEmail}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400">Autor (solo lectura)</span>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Comentario
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={6}
          required
          minLength={5}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
        <p className="mt-1 text-xs text-gray-400">{comment.length} caracteres</p>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Estado
        </label>
        <div className="flex gap-3">
          {(["VISIBLE", "HIDDEN"] as const).map((s) => (
            <label
              key={s}
              className={`flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 transition-colors ${
                status === s
                  ? s === "VISIBLE"
                    ? "border-green-400 bg-green-50 dark:bg-green-500/10"
                    : "border-gray-400 bg-gray-50 dark:bg-gray-800"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="sr-only"
              />
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  s === "VISIBLE" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {s === "VISIBLE" ? "Visible en /blog" : "Oculta"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog/reviews")}
          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

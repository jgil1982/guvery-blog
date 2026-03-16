"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function FeedbackForm() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar los 5MB.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setImageUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment,
        url: url.trim() || null,
        imageUrl,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Error al enviar el feedback.");
      return;
    }

    setSuccess(true);
    setComment("");
    setUrl("");
    setImagePreview(null);
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-success-200 bg-success-50 p-8 text-center dark:border-success-500/20 dark:bg-success-500/10">
        <div className="mb-3 flex justify-center">
          <svg
            className="h-14 w-14 text-success-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          ¡Gracias por tu feedback!
        </h3>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Tu comentario ha sido enviado correctamente y será revisado por nuestro
          equipo.
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSuccess(false)}
        >
          Enviar otro comentario
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      {/* User info header */}
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
          {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">
            {session?.user?.name ?? "Usuario"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-error-50 px-4 py-3 text-sm text-error-600 dark:bg-error-500/15 dark:text-error-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Comment */}
        <div>
          <Label>
            Comentario <span className="text-error-500">*</span>
          </Label>
          <TextArea
            placeholder="Cuéntanos tu experiencia con Guvery. ¿Qué te gustó? ¿Qué podemos mejorar?"
            value={comment}
            onChange={setComment}
            rows={5}
          />
          <p className="mt-1 text-xs text-gray-400">
            {comment.length}/1000 caracteres (mínimo 5)
          </p>
        </div>

        {/* Reference URL */}
        <div>
          <Label>URL de referencia (opcional)</Label>
          <Input
            type="url"
            placeholder="https://guvery.com/mi-pedido"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Enlace relacionado a tu experiencia o pedido
          </p>
        </div>

        {/* Image upload */}
        <div>
          <Label>Imagen adjunta (opcional)</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-5 text-center transition-colors hover:border-brand-400 dark:border-gray-700 dark:hover:border-brand-500"
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Vista previa"
                  width={400}
                  height={200}
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 rounded-full bg-error-500 px-2 py-0.5 text-xs text-white hover:bg-error-600"
                >
                  Quitar
                </button>
              </div>
            ) : (
              <div className="py-2 text-gray-400">
                <svg
                  className="mx-auto mb-2 h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium">
                  Haz clic para subir una imagen
                </p>
                <p className="text-xs">PNG, JPG, GIF — máximo 5MB</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <Button className="w-full" size="sm" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Feedback"}
        </Button>
      </form>
    </div>
  );
}

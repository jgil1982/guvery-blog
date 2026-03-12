// src/components/blog/NewsletterForm.tsx
"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("¡Gracias! Te hemos suscrito correctamente.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo salió mal. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Intenta de nuevo.");
    }
  }

  return (
    <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold">
        Recibe guías de compra en tu email
      </h2>
      <p className="mt-3 text-blue-100 text-sm md:text-base max-w-md mx-auto">
        Sin spam. Solo los mejores consejos para comprar en USA desde Perú.
      </p>

      {status === "success" ? (
        <div className="mt-6 inline-flex items-center gap-2 bg-white/20 rounded-xl px-6 py-3 text-white font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "Suscribiendo..." : "Suscribirme"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-200">{message}</p>
      )}
    </section>
  );
}

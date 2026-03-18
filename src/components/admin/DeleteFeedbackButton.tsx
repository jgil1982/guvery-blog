// src/components/admin/DeleteFeedbackButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteFeedbackButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Eliminar esta reseña? Esta acción no se puede deshacer.")) return;
    setLoading(true);
    await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50"
    >
      {loading ? "..." : "Eliminar"}
    </button>
  );
}

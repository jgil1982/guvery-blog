// src/components/admin/ToggleFeedbackButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  currentStatus: "VISIBLE" | "HIDDEN";
}

export default function ToggleFeedbackButton({ id, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    const next = currentStatus === "VISIBLE" ? "HIDDEN" : "VISIBLE";
    setLoading(true);
    await fetch(`/api/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
    setLoading(false);
  }

  if (loading) {
    return <span className="text-xs text-gray-400">...</span>;
  }

  return currentStatus === "VISIBLE" ? (
    <button
      onClick={handleToggle}
      className="text-yellow-600 hover:text-yellow-800 text-xs font-medium"
    >
      Ocultar
    </button>
  ) : (
    <button
      onClick={handleToggle}
      className="text-green-600 hover:text-green-800 text-xs font-medium"
    >
      Mostrar
    </button>
  );
}

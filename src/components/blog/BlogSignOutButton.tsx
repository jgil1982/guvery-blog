"use client";
import { signOut } from "next-auth/react";

export default function BlogSignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}

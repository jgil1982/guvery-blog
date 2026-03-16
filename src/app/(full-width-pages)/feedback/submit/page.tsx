// src/app/(full-width-pages)/feedback/submit/page.tsx
import FeedbackForm from "@/components/feedback/FeedbackForm";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import { auth, signOut } from "@/lib/auth";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Feedback | Guvery",
  description: "Comparte tu experiencia con el servicio de Guvery",
};

export default async function FeedbackSubmitPage() {
  const session = await auth();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Image
              src="/images/logo/logo.svg"
              alt="Guvery"
              width={130}
              height={34}
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Guvery"
              width={130}
              height={34}
              className="hidden dark:block"
            />
            <div className="flex items-center gap-4">
              {session?.user && (
                <span className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
                  Hola,{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {session.user.name ?? session.user.email}
                  </span>
                </span>
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/signin" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10">
                <svg
                  className="h-7 w-7 text-brand-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </span>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
              ¿Cómo fue tu experiencia?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tu feedback nos ayuda a mejorar el servicio de Guvery para todos
            </p>
          </div>

          <FeedbackForm />
        </main>

        {/* Theme toggler */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeTogglerTwo />
        </div>
      </div>
    </ThemeProvider>
  );
}

// src/app/(admin)/(others-pages)/feedback/page.tsx
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback de Usuarios | Guvery Admin",
  description: "Gestiona los comentarios y retroalimentación de usuarios de Guvery",
};

export default function AdminFeedbackPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Feedback de Usuarios" />

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <svg
              className="h-5 w-5 text-brand-500"
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
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">
              Comentarios del Servicio Guvery
            </h2>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Visualiza, filtra y modera todos los comentarios enviados por los
              usuarios. Puedes ocultar comentarios inapropiados o eliminarlos
              permanentemente.
            </p>
          </div>
        </div>
      </div>

      <FeedbackTable />
    </div>
  );
}

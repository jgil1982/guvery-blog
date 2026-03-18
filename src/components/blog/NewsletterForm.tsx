// src/components/blog/NewsletterForm.tsx
import Link from "next/link";

export default function NewsletterForm() {
  return (
    <section className="bg-[#00594f] rounded-2xl p-8 md:p-12 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold">
        ¿Quieres escribir una reseña?
      </h2>
      <p className="mt-3 text-[#a5f0e4] text-sm md:text-base max-w-md mx-auto">
        Déjanos tu email y te avisamos cuando puedas publicar tu experiencia con Guvery.
      </p>
      <div className="mt-6">
        <Link
          href="/signup"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-[#00594f] font-semibold text-sm hover:bg-[#e8f5f3] transition-colors"
        >
          Suscribirme
        </Link>
      </div>
    </section>
  );
}

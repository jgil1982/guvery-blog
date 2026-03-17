// src/lib/mockArticles.ts
// Artículos mock para mostrar en /blog como punto de partida para reseñas.
// Sin base de datos — datos hardcoded.

export interface MockArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string; // "X min"
}

export const mockArticles: MockArticle[] = [
  {
    id: "guvery-1",
    title: "Mi primera experiencia comprando con Guvery",
    summary:
      "Descubre cómo Guvery está transformando las compras internacionales para miles de peruanos. Una guía paso a paso desde el registro hasta la entrega.",
    category: "Experiencias",
    readTime: "4 min",
  },
  {
    id: "guvery-2",
    title: "¿Vale la pena usar Guvery? Un análisis honesto",
    summary:
      "Evaluamos el servicio de Guvery en detalle: tiempos de entrega, costos, atención al cliente y comparación con otras alternativas del mercado.",
    category: "Análisis",
    readTime: "6 min",
  },
  {
    id: "guvery-3",
    title: "Guvery desde adentro: lo que debes saber antes de usarlo",
    summary:
      "Todo lo que nadie te cuenta sobre las importaciones personales con Guvery: consejos, trucos y errores comunes que debes evitar al realizar tu primera compra.",
    category: "Consejos",
    readTime: "5 min",
  },
];

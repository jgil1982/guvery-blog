// src/lib/mockArticles.ts
// Artículos mock para mostrar en / como punto de partida para reseñas.

export interface MockArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  image: string;
}

export const mockArticles: MockArticle[] = [
  {
    id: "guvery-1",
    title: "Mi primera experiencia comprando con Guvery",
    summary:
      "Descubre cómo Guvery está transformando las compras internacionales para miles de peruanos. Una guía paso a paso desde el registro hasta la entrega.",
    category: "Experiencias",
    readTime: "4 min",
    image: "https://picsum.photos/seed/shopping-cart/600/300",
  },
  {
    id: "guvery-2",
    title: "¿Vale la pena usar Guvery? Un análisis honesto",
    summary:
      "Evaluamos el servicio de Guvery en detalle: tiempos de entrega, costos, atención al cliente y comparación con otras alternativas del mercado.",
    category: "Análisis",
    readTime: "6 min",
    image: "https://picsum.photos/seed/analysis-review/600/300",
  },
  {
    id: "guvery-3",
    title: "Guvery desde adentro: lo que debes saber antes de usarlo",
    summary:
      "Todo lo que nadie te cuenta sobre las importaciones personales con Guvery: consejos, trucos y errores comunes que debes evitar al realizar tu primera compra.",
    category: "Consejos",
    readTime: "5 min",
    image: "https://picsum.photos/seed/tips-guide/600/300",
  },
  {
    id: "guvery-4",
    title: "Compré electrónicos desde Amazon con Guvery: así me fue",
    summary:
      "iPhone, MacBook, auriculares Bose... ¿es seguro traer electrónicos de alto valor con Guvery? Mi experiencia real con empaques, garantías y aduanas.",
    category: "Electrónicos",
    readTime: "5 min",
    image: "https://picsum.photos/seed/electronics-gadgets/600/300",
  },
  {
    id: "guvery-5",
    title: "Ropa y zapatillas desde USA: guía completa con Guvery",
    summary:
      "Nike, Adidas, New Balance al precio de USA. Te cuento cómo elegir tu talla correcta, qué tiendas usar y cuánto terminas pagando en total con Guvery.",
    category: "Moda",
    readTime: "4 min",
    image: "https://picsum.photos/seed/fashion-shoes/600/300",
  },
  {
    id: "guvery-6",
    title: "Suplementos y vitaminas desde iHerb con Guvery",
    summary:
      "Proteínas, vitaminas y suplementos deportivos a precio internacional. Cómo pasar aduana sin problemas y qué cantidades son permitidas en Perú.",
    category: "Salud",
    readTime: "4 min",
    image: "https://picsum.photos/seed/supplements-health/600/300",
  },
  {
    id: "guvery-7",
    title: "Juguetes y regalos navideños desde USA: mi experiencia",
    summary:
      "LEGO, Hot Wheels, Funko Pop y más. Cómo planificar tus compras con tiempo para que lleguen antes de Navidad usando el servicio de Guvery.",
    category: "Juguetes",
    readTime: "3 min",
    image: "https://picsum.photos/seed/toys-christmas/600/300",
  },
  {
    id: "guvery-8",
    title: "¿Cuánto cuesta realmente usar Guvery? Desglose de tarifas",
    summary:
      "Precio del producto + flete + comisión Guvery + impuestos. Un análisis detallado para que sepas exactamente cuánto pagarás antes de comprar.",
    category: "Análisis",
    readTime: "7 min",
    image: "https://picsum.photos/seed/cost-money-finance/600/300",
  },
  {
    id: "guvery-9",
    title: "Cosméticos y skincare desde Sephora con Guvery",
    summary:
      "Fenty Beauty, The Ordinary, Charlotte Tilbury... ¿llegan en buen estado? Mi experiencia trayendo cosméticos líquidos y en polvo desde Estados Unidos.",
    category: "Belleza",
    readTime: "4 min",
    image: "https://picsum.photos/seed/cosmetics-beauty/600/300",
  },
];

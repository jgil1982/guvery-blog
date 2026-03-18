// prisma/seed.ts
import { PrismaClient, ArticleStatus, SubscriberStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Categories ───────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "guias-de-compra" },
      update: {},
      create: {
        name: "Guías de Compra",
        slug: "guias-de-compra",
        description:
          "Guías paso a paso para comprar productos desde USA hacia Perú.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "comparativas" },
      update: {},
      create: {
        name: "Comparativas",
        slug: "comparativas",
        description:
          "Comparamos precios y opciones para que elijas lo mejor.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "como-funciona-guvery" },
      update: {},
      create: {
        name: "Cómo Funciona Guvery",
        slug: "como-funciona-guvery",
        description:
          "Todo lo que necesitas saber sobre el marketplace de Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "experiencias" },
      update: {},
      create: {
        name: "Experiencias",
        slug: "experiencias",
        description: "Experiencias reales de compradores con Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "analisis" },
      update: {},
      create: {
        name: "Análisis",
        slug: "analisis",
        description: "Análisis detallados del servicio de Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "consejos" },
      update: {},
      create: {
        name: "Consejos",
        slug: "consejos",
        description: "Tips y consejos para sacar el máximo a Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "electronicos" },
      update: {},
      create: {
        name: "Electrónicos",
        slug: "electronicos",
        description: "Compra de electrónicos y gadgets desde USA con Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "moda" },
      update: {},
      create: {
        name: "Moda",
        slug: "moda",
        description: "Ropa, zapatillas y accesorios desde USA con Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "salud" },
      update: {},
      create: {
        name: "Salud",
        slug: "salud",
        description: "Suplementos, vitaminas y productos de salud con Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "juguetes" },
      update: {},
      create: {
        name: "Juguetes",
        slug: "juguetes",
        description: "Juguetes y regalos desde USA con Guvery.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "belleza" },
      update: {},
      create: {
        name: "Belleza",
        slug: "belleza",
        description: "Cosméticos y skincare desde USA con Guvery.",
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categories created`);

  const [guias, comparativas, comoFunciona, experiencias, analisis, consejos, electronicos, moda, salud, juguetes, belleza] = categories;

  // ─── Articles ─────────────────────────────────────────────────────────────
  const articles = await Promise.all([
    prisma.article.upsert({
      where: { slug: "como-comprar-en-amazon-desde-peru" },
      update: {},
      create: {
        title: "Cómo comprar en Amazon desde Perú en 2024",
        slug: "como-comprar-en-amazon-desde-peru",
        excerpt:
          "Descubre el método más sencillo para comprar en Amazon desde Perú sin pagar precios exagerados de importación.",
        content: `
## ¿Se puede comprar en Amazon desde Perú?

Sí, es posible — y más fácil de lo que crees. A través de Guvery, puedes comprar cualquier producto de Amazon USA y recibirlo en tu puerta en Perú sin necesidad de agencias de carga ni trámites complicados.

## El problema de importar solo

Cuando intentas importar un producto de Amazon por tu cuenta, enfrentas:

- **Aranceles altos**: El Estado peruano cobra hasta 12% de arancel + IGV sobre productos importados.
- **Couriers costosos**: DHL, FedEx y similares cobran tarifas que a veces superan el valor del producto.
- **Procesos lentos**: Puede tomar 2-4 semanas y requerir gestión aduanera.

## La solución: Guvery

Guvery conecta compradores peruanos con **viajeros que regresan de USA**. El viajero compra tu producto, lo trae en su equipaje personal y te lo entrega.

### ¿Por qué es más barato?

Cada persona puede ingresar a Perú con hasta **$500 USD en compras personales** libres de impuestos. Los viajeros de Guvery aprovechan esa franquicia para traer tu producto.

## Paso a paso

1. **Regístrate en Guvery** — crea tu cuenta gratis
2. **Publica tu pedido** — pega el link del producto de Amazon
3. **Elige un viajero** — compara ofertas y elige el que más te convenga
4. **Paga de forma segura** — Guvery retiene el pago hasta confirmar entrega
5. **Recibe tu producto** — coordina la entrega con el viajero

## ¿Cuánto cuesta el servicio?

El viajero cobra una comisión que generalmente oscila entre **8% y 15%** del valor del producto. Comparado con los aranceles y couriers tradicionales, el ahorro puede ser significativo.

## Conclusión

Comprar en Amazon desde Perú ya no es un proceso complicado. Con Guvery, tienes acceso a millones de productos de USA a precios razonables y con la seguridad de un marketplace regulado.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-01-15"),
        featuredImage:
          "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=1200&q=80",
        metaTitle: "Cómo comprar en Amazon desde Perú 2024 | Guvery Blog",
        metaDescription:
          "Aprende a comprar en Amazon desde Perú usando Guvery. Sin aranceles exagerados, sin couriers costosos. Guía completa paso a paso.",
        categoryId: guias.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "amazon-vs-ebay-cual-elegir-desde-peru" },
      update: {},
      create: {
        title: "Amazon vs eBay: ¿Cuál conviene más para comprar desde Perú?",
        slug: "amazon-vs-ebay-cual-elegir-desde-peru",
        excerpt:
          "Comparamos Amazon y eBay para que sepas cuál plataforma te da mejores precios y opciones al comprar desde Perú.",
        content: `
## Amazon vs eBay para compradores peruanos

Ambas plataformas ofrecen productos de USA, pero tienen diferencias importantes que afectan tu experiencia de compra desde Perú.

## Amazon

**Lo bueno:**
- Precios fijos y transparentes
- Prime garantiza disponibilidad inmediata
- Política de devoluciones confiable
- Millones de productos con reseñas verificadas

**Lo malo:**
- No todo vendedor envía a intermediarios
- Precios son públicos — sin margen de negociación

**Mejor para:** Electrónica, libros, ropa de marcas conocidas, suplementos.

## eBay

**Lo bueno:**
- Sistema de subastas puede dar precios muy bajos
- Productos de segunda mano o descontinuados
- Vendedores internacionales con envío directo

**Lo malo:**
- Mayor riesgo con vendedores desconocidos
- Las subastas requieren tiempo y atención
- Calidad variable en productos usados

**Mejor para:** Coleccionables, electrónica de segunda mano, productos descontinuados.

## ¿Cuál usar con Guvery?

Con Guvery puedes pedir productos de **ambas plataformas**. Solo pega el link del producto al crear tu pedido y los viajeros se encargarán del resto.

### Recomendación por categoría

| Categoría | Plataforma recomendada |
|-----------|------------------------|
| Electrónica nueva | Amazon |
| Ropa y accesorios | Amazon |
| Electrónica usada | eBay |
| Coleccionables | eBay |
| Suplementos | Amazon |

## Conclusión

Para la mayoría de los compradores peruanos, **Amazon es la opción más segura y conveniente**. eBay tiene su lugar para productos específicos, pero requiere más experiencia para evitar malas compras.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-02-03"),
        featuredImage:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
        metaTitle: "Amazon vs eBay desde Perú: ¿Cuál es mejor? | Guvery Blog",
        metaDescription:
          "Comparativa completa: Amazon vs eBay para compradores peruanos. Descubre cuál plataforma conviene más según lo que necesitas comprar.",
        categoryId: comparativas.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "que-es-guvery-como-funciona" },
      update: {},
      create: {
        title: "¿Qué es Guvery y cómo funciona? Guía completa 2024",
        slug: "que-es-guvery-como-funciona",
        excerpt:
          "Guvery es el marketplace que conecta compradores en Perú con viajeros desde USA. Aquí te explicamos exactamente cómo funciona.",
        content: `
## ¿Qué es Guvery?

Guvery es un **marketplace peer-to-peer** peruano que conecta personas que quieren comprar productos en USA con viajeros internacionales que regresan a Perú.

Fundado hace más de 9 años, Guvery ha completado más de **30,000 entregas exitosas** y se ha convertido en la plataforma líder para importaciones personales en Perú.

## ¿Cómo funciona exactamente?

### Para el comprador

1. Encuentra el producto que quieres en Amazon, Nike, Apple, o cualquier tienda de USA
2. Copia el link del producto
3. Crea un pedido en Guvery con ese link, la cantidad y el precio
4. Los viajeros disponibles hacen sus ofertas (comisión + fecha de entrega)
5. Tú eliges la oferta que más te conviene
6. Pagas a Guvery (el dinero queda en custodia)
7. El viajero compra el producto y te lo entrega en Perú
8. Confirmas la entrega y Guvery libera el pago al viajero

### Para el viajero

1. Publicas tu viaje (origen, destino, fecha de regreso, capacidad)
2. Ves pedidos disponibles de compradores
3. Haces ofertas en los pedidos que te interesan
4. Compras los productos en USA con tu propio dinero
5. Los traes en tu equipaje personal
6. Entregas y recibes tu pago + comisión

## ¿Es legal?

Sí. En Perú, cada persona puede ingresar hasta **$500 USD en compras personales** libres de impuestos. Los viajeros de Guvery operan dentro de ese marco legal.

## ¿Es seguro?

Guvery tiene varios mecanismos de seguridad:

- **Pago en custodia**: Guvery retiene el dinero hasta confirmar la entrega
- **Sistema de reputación**: Compradores y viajeros tienen calificaciones verificadas
- **Soporte activo**: Equipo de resolución de conflictos disponible
- **Verificación de identidad**: Los viajeros pasan por un proceso de verificación

## ¿Cuánto cuesta usar Guvery?

- **Para compradores**: Guvery cobra ~8% de comisión sobre el valor del pedido
- **Para viajeros**: Sin costo. Ganan entre 5-25% por pedido completado

## Conclusión

Si quieres comprar productos de USA sin pagar aranceles exorbitantes ni depender de couriers caros, Guvery es la solución más eficiente disponible en Perú hoy.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-02-20"),
        featuredImage:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
        metaTitle: "¿Qué es Guvery y cómo funciona? Guía 2024 | Guvery Blog",
        metaDescription:
          "Todo sobre Guvery: qué es, cómo funciona, si es legal y seguro, y cuánto cuesta. La guía completa del marketplace peruano de importaciones personales.",
        categoryId: comoFunciona.id,
      },
    }),

    // ── 9 Guvery experience articles (from home page cards) ──────────────────

    prisma.article.upsert({
      where: { slug: "primera-experiencia-comprando-guvery" },
      update: {},
      create: {
        title: "Mi primera experiencia comprando con Guvery",
        slug: "primera-experiencia-comprando-guvery",
        excerpt:
          "Descubre cómo Guvery está transformando las compras internacionales para miles de peruanos. Una guía paso a paso desde el registro hasta la entrega.",
        content: `
## ¿Cómo fue mi primera vez con Guvery?

Llevaba meses intentando conseguir unas zapatillas Nike que en Perú costaban el doble que en USA. Un amigo me recomendó Guvery y decidí probarlo.

## El proceso paso a paso

### 1. Registro
Me registré en menos de 5 minutos. Solo email y contraseña, sin formularios interminables.

### 2. Creé mi pedido
Copié el link del producto de Nike.com, indiqué la talla y el color. El sistema calculó automáticamente el precio en soles.

### 3. Elegí un viajero
Aparecieron 4 viajeros con ofertas diferentes. Uno viajaba en 3 días, otro en 2 semanas. Elegí al que viajaba más pronto con mejor reputación (4.9 estrellas, 47 entregas).

### 4. Pagué con seguridad
Pagué mediante tarjeta de crédito. Guvery retiene el dinero hasta que yo confirme la entrega. Me sentí tranquilo.

### 5. La entrega
El viajero me contactó por WhatsApp al llegar a Lima. Coordinamos la entrega en un Starbucks. Todo muy profesional.

## ¿Valió la pena?

El precio total (producto + comisión del viajero) fue un 35% menos que el precio de tiendas físicas en Lima. Totalmente recomendado para una primera experiencia.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-03-01"),
        featuredImage: "https://picsum.photos/seed/shopping-cart/600/300",
        metaTitle: "Mi primera experiencia comprando con Guvery | Blog",
        metaDescription:
          "Guía paso a paso de la primera compra con Guvery: registro, pedido, elección de viajero y entrega. ¿Vale la pena? Descúbrelo aquí.",
        categoryId: experiencias.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "vale-la-pena-usar-guvery" },
      update: {},
      create: {
        title: "¿Vale la pena usar Guvery? Un análisis honesto",
        slug: "vale-la-pena-usar-guvery",
        excerpt:
          "Evaluamos el servicio de Guvery en detalle: tiempos de entrega, costos, atención al cliente y comparación con otras alternativas del mercado.",
        content: `
## ¿Vale la pena Guvery? La respuesta honesta

Después de 8 compras con Guvery en el último año, puedo dar una evaluación objetiva del servicio.

## Lo que funciona muy bien

**Precios:** El ahorro real promedio es del 25-40% comparado con tiendas locales o importadoras. Para productos premium (Apple, Nike, Sony) la diferencia es aún mayor.

**Seguridad:** El sistema de pagos en custodia funciona. En mis 8 compras, nunca tuve un problema que no se resolviera.

**Velocidad:** El 90% de mis pedidos llegó en menos de 7 días desde que publiqué el pedido.

## Lo que puede mejorar

**Disponibilidad de viajeros:** Para fechas de alta demanda (Navidad, Black Friday) hay más competencia y los viajeros cobran comisiones más altas.

**Coordinación de entrega:** Depende mucho del viajero. Algunos son muy puntuales, otros menos.

## Comparación con alternativas

| Criterio | Guvery | DHL/FedEx | Importadoras |
|----------|--------|-----------|--------------|
| Precio | ★★★★★ | ★★★ | ★★★ |
| Velocidad | ★★★★ | ★★★★★ | ★★ |
| Seguridad | ★★★★ | ★★★★★ | ★★★ |

## Veredicto

Para productos de hasta $300, Guvery es la mejor opción. Para productos muy caros o frágiles, considera un courier tradicional.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-03-10"),
        featuredImage: "https://picsum.photos/seed/analysis-review/600/300",
        metaTitle: "¿Vale la pena usar Guvery? Análisis honesto 2024",
        metaDescription:
          "Análisis detallado de Guvery tras 8 compras: precios, tiempos, seguridad y comparación con DHL, FedEx e importadoras.",
        categoryId: analisis.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "guvery-desde-adentro-antes-de-usarlo" },
      update: {},
      create: {
        title: "Guvery desde adentro: lo que debes saber antes de usarlo",
        slug: "guvery-desde-adentro-antes-de-usarlo",
        excerpt:
          "Todo lo que nadie te cuenta sobre las importaciones personales con Guvery: consejos, trucos y errores comunes que debes evitar al realizar tu primera compra.",
        content: `
## Los secretos que nadie te cuenta sobre Guvery

Después de hablar con docenas de usuarios y viajeros frecuentes de Guvery, recopilé los consejos más útiles que rara vez se mencionan.

## Antes de publicar tu pedido

**Verifica el precio exacto:** Siempre incluye el precio de envío interno (Amazon cobra shipping a la dirección del viajero). Muchos compradores olvidan este costo.

**Fotos del producto:** Agrega capturas de pantalla a tu pedido. Los viajeros son más propensos a hacer ofertas cuando ven claramente lo que pides.

**Sé flexible con los plazos:** Si tu pedido no es urgente, amplía el rango de fechas. Recibirás más ofertas y mejores precios.

## Al elegir un viajero

**Prioriza la reputación sobre el precio:** Un viajero con 50 entregas y 4.9 estrellas vale más que uno desconocido que cobra $5 menos.

**Lee los comentarios:** Los comentarios anteriores revelan mucho sobre la puntualidad y comunicación del viajero.

## Errores comunes

1. **No verificar el stock:** El viajero puede llegar a la tienda y encontrar que el producto está agotado.
2. **Pedir productos muy frágiles:** Vidrio, cerámica o pantallas sin embalaje especial pueden llegar rotos.
3. **No considerar el tamaño:** Un viajero no puede traer un televisor de 55" en su maleta.

## El mejor momento para comprar

Los mejores precios (menos competencia, más viajeros) son en temporada baja: febrero-abril y agosto-octubre.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-03-18"),
        featuredImage: "https://picsum.photos/seed/tips-guide/600/300",
        metaTitle: "Guvery: consejos y errores que debes evitar | Blog",
        metaDescription:
          "Los trucos y secretos de Guvery que nadie te cuenta: cómo publicar pedidos, elegir viajeros y evitar los errores más comunes.",
        categoryId: consejos.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "electronicos-amazon-con-guvery" },
      update: {},
      create: {
        title: "Compré electrónicos desde Amazon con Guvery: así me fue",
        slug: "electronicos-amazon-con-guvery",
        excerpt:
          "iPhone, MacBook, auriculares Bose... ¿es seguro traer electrónicos de alto valor con Guvery? Mi experiencia real con empaques, garantías y aduanas.",
        content: `
## Electrónicos de alto valor con Guvery: ¿riesgo real?

Compré un MacBook Pro M3 de $1,299 y unos AirPods Pro de $249 usando Guvery. Aquí va mi experiencia completa.

## El MacBook Pro

### Proceso
Publiqué el pedido con el link de Apple.com. Recibí 6 ofertas en 24 horas. Elegí a un viajero con 80+ entregas y experiencia específica con electrónicos.

### ¿Llegó en buen estado?
Perfectamente embalado en la caja original de Apple. El viajero lo protegió con ropa en su maleta (práctica habitual).

### Garantía
Apple ofrece garantía internacional, así que la garantía es válida en Perú con el número de serie. No hubo problemas.

## Los AirPods Pro

Vinieron en su caja sellada. Sin ningún problema.

## Lo que aprendí

**Inspecciona siempre al recibir:** Antes de firmar la entrega, abre la caja y verifica que el dispositivo encienda.

**Exige garantía del viajero:** Muchos viajeros ofrecen garantía personal de 48h. Pídela.

**Para productos muy caros:** Considera pedir al viajero que compre en tienda física Apple en lugar de Amazon, para evitar vendedores terceros.

## ¿Lo repetiría?

Sí, sin dudarlo. Ahorré $600 en el MacBook comparado con el precio en Saga Falabella. El proceso fue completamente seguro.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-04-05"),
        featuredImage: "https://picsum.photos/seed/electronics-gadgets/600/300",
        metaTitle: "Comprar electrónicos con Guvery: MacBook y AirPods desde Amazon",
        metaDescription:
          "Experiencia comprando MacBook Pro y AirPods desde Amazon con Guvery. ¿Es seguro? ¿Llegan con garantía? Todo lo que necesitas saber.",
        categoryId: electronicos.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "ropa-zapatillas-usa-guvery" },
      update: {},
      create: {
        title: "Ropa y zapatillas desde USA: guía completa con Guvery",
        slug: "ropa-zapatillas-usa-guvery",
        excerpt:
          "Nike, Adidas, New Balance al precio de USA. Te cuento cómo elegir tu talla correcta, qué tiendas usar y cuánto terminas pagando en total con Guvery.",
        content: `
## Ropa y zapatillas desde USA con Guvery

La moda es una de las categorías más populares en Guvery. Nike, Adidas, New Balance, Levi's... todos al precio de USA.

## Guía de tallas

El error más común es pedir la talla equivocada. En USA las tallas son diferentes:

**Zapatillas (conversión USA → PE/EU):**
- 8 US = 41 EU
- 9 US = 42 EU
- 10 US = 43 EU
- 11 US = 44 EU

**Ropa (general):**
- S USA = S/M en Perú
- M USA = M/L en Perú
- L USA = XL en Perú

## Las mejores tiendas para ropa

1. **Nike.com** — Mejor selección, incluye outlet con hasta 50% off
2. **Adidas.com** — Especialmente bueno para ropa deportiva
3. **Foot Locker** — Para zapatillas de edición limitada
4. **Nordstrom Rack** — Marcas premium con descuento

## Costo total estimado

Zapatillas Nike Air Max 270 en USA: $130
+ Comisión viajero (12%): $15.60
+ Total en USD: $145.60
= En soles (aprox.): S/ 545

Precio en tienda Lima: S/ 899

**Ahorro: S/ 354 (39%)**

## Consejos para ropa

- Siempre verifica la política de devoluciones de la tienda (el viajero tiene que poder devolver si la talla está mal)
- Pide al viajero que confirme el stock antes de comprometerse
- Para zapatillas limited edition, actúa rápido — pueden agotarse
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-04-15"),
        featuredImage: "https://picsum.photos/seed/fashion-shoes/600/300",
        metaTitle: "Ropa y zapatillas desde USA con Guvery: guía de tallas y precios",
        metaDescription:
          "Guía completa para comprar Nike, Adidas y ropa de marca desde USA con Guvery: tallas, tiendas recomendadas y costo real.",
        categoryId: moda.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "suplementos-vitaminas-iherb-guvery" },
      update: {},
      create: {
        title: "Suplementos y vitaminas desde iHerb con Guvery",
        slug: "suplementos-vitaminas-iherb-guvery",
        excerpt:
          "Proteínas, vitaminas y suplementos deportivos a precio internacional. Cómo pasar aduana sin problemas y qué cantidades son permitidas en Perú.",
        content: `
## Suplementos desde iHerb con Guvery

iHerb es el paraíso de los suplementos y vitaminas. Con Guvery, puedes acceder a esos precios directamente desde Perú.

## ¿Qué puedo traer?

La aduana peruana permite el ingreso de suplementos para uso personal. Las reglas generales:

- **Proteínas en polvo:** Hasta 2 bolsas/tarros por persona
- **Vitaminas en cápsulas/tabletas:** Hasta 3 meses de consumo
- **Aminoácidos y pre-workouts:** 1-2 unidades

## Lo que NO se puede traer

- Productos con ingredientes regulados (algunos estimulantes)
- Cantidades que sugieran reventa comercial
- Medicamentos que requieren receta médica

## Los mejores productos para pedir

1. **Optimum Nutrition Gold Standard Whey** — La proteína más popular, excelente relación precio/calidad
2. **Garden of Life Vitamina D3** — Vitaminas de alta calidad
3. **NOW Foods Magnesio** — Un clásico a excelente precio
4. **Cellucor C4 Pre-Workout** — Popular entre atletas

## Ejemplo de ahorro real

NOW Foods Omega-3 (300 cápsulas) en iHerb: $18
En cadenas locales: S/ 120 (~$32)
**Ahorro: 44%**

## Tip importante

Guarda siempre los empaques originales y las etiquetas. El viajero debe declararlos como "vitaminas y suplementos de uso personal."
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-04-25"),
        featuredImage: "https://picsum.photos/seed/supplements-health/600/300",
        metaTitle: "Suplementos y vitaminas desde iHerb con Guvery | Blog",
        metaDescription:
          "Guía para comprar proteínas, vitaminas y suplementos desde iHerb con Guvery: qué se puede traer, cantidades permitidas y mejores productos.",
        categoryId: salud.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "juguetes-navidenos-usa-guvery" },
      update: {},
      create: {
        title: "Juguetes y regalos navideños desde USA: mi experiencia",
        slug: "juguetes-navidenos-usa-guvery",
        excerpt:
          "LEGO, Hot Wheels, Funko Pop y más. Cómo planificar tus compras con tiempo para que lleguen antes de Navidad usando el servicio de Guvery.",
        content: `
## Regalos navideños desde USA con Guvery

Navidad 2023: decidí comprar todos los regalos familiares desde USA usando Guvery. Aquí va cómo me fue.

## La planificación es clave

El principal error es esperar hasta diciembre. Para Navidad, necesitas publicar tus pedidos en **noviembre a más tardar**.

### Mi cronograma recomendado

- **1 de noviembre:** Publica los pedidos
- **15-30 de noviembre:** Ideal para que los viajeros viajen (Black Friday tiene los mejores precios)
- **1-15 de diciembre:** Los pedidos llegan a Lima
- **24 de diciembre:** ¡Regalos listos!

## Los juguetes que compré

**LEGO Technic Ferrari Daytona SP3** ($349 → S/ 650 vs S/ 1,200 en tiendas)
**Funko Pop Stranger Things Set** ($45 → S/ 145 vs S/ 280)
**Hot Wheels Monster Trucks Pack** ($25 → S/ 85 vs S/ 160)

Ahorro total en los 3 items: S/ 760 (43% de ahorro)

## Consejos para juguetes

- **Verifica la edad recomendada:** Los juguetes para niños menores de 3 años tienen regulaciones especiales
- **LEGO es perfecto para Guvery:** Viene en caja robusta, no se daña en el equipaje
- **Para electrónicos infantiles:** Verifica que funcionen en 220V (Perú) o incluyan adaptador

## Las mejores tiendas

1. **Amazon** — Mayor variedad y mejores precios
2. **Target** — Exclusivos y sets especiales
3. **LEGO Store** — Juegos exclusivos que no están en Amazon
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-05-02"),
        featuredImage: "https://picsum.photos/seed/toys-christmas/600/300",
        metaTitle: "Juguetes navideños desde USA con Guvery: LEGO, Funko Pop y más",
        metaDescription:
          "Cómo comprar juguetes y regalos navideños desde USA con Guvery. Cronograma, mejores tiendas y cuánto ahorras en LEGO, Funko Pop y Hot Wheels.",
        categoryId: juguetes.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "cuanto-cuesta-usar-guvery" },
      update: {},
      create: {
        title: "¿Cuánto cuesta realmente usar Guvery? Desglose de tarifas",
        slug: "cuanto-cuesta-usar-guvery",
        excerpt:
          "Precio del producto + flete + comisión Guvery + impuestos. Un análisis detallado para que sepas exactamente cuánto pagarás antes de comprar.",
        content: `
## El costo real de Guvery: nada oculto

Antes de usar Guvery, quise entender exactamente cuánto pagaría. Aquí está el desglose completo.

## Los componentes del precio

### 1. Precio del producto
El precio que aparece en Amazon, Nike, Apple, etc. en dólares.

### 2. Envío interno USA
El costo de envío del producto a la dirección del viajero en USA. Muchos vendedores en Amazon ofrecen envío gratis, pero no todos.

### 3. Comisión del viajero
Oscila entre **8% y 18%** del precio del producto. Depende de:
- Peso y volumen del producto
- Urgencia del pedido
- Reputación del viajero (los mejores cobran más)

### 4. Comisión de Guvery
Aproximadamente **8%** del valor del pedido, cobrado al comprador.

### 5. Tipo de cambio
Guvery usa un tipo de cambio ligeramente más alto que el oficial para cubrir fluctuaciones.

## Ejemplo práctico real

**Producto:** Sony WH-1000XM5 en Amazon = $279

| Componente | Monto |
|-----------|-------|
| Producto | $279 |
| Envío USA | $0 (Prime) |
| Comisión viajero (12%) | $33.48 |
| Comisión Guvery (8%) | $22.32 |
| **Total USD** | **$334.80** |
| **Total soles** (3.75) | **S/ 1,255** |

**Precio en falabella.com:** S/ 1,899
**Ahorro real: S/ 644 (34%)**

## ¿Cuándo NO conviene usar Guvery?

- Productos de menos de $30 (la comisión mínima puede no justificarse)
- Productos de gran volumen (electrónicos de línea blanca, muebles)
- Cuando hay una oferta local equivalente
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-05-15"),
        featuredImage: "https://picsum.photos/seed/cost-money-finance/600/300",
        metaTitle: "¿Cuánto cuesta Guvery? Desglose completo de tarifas 2024",
        metaDescription:
          "Desglose detallado de todos los costos de Guvery: producto, envío, comisión viajero, comisión plataforma y tipo de cambio. Con ejemplo real.",
        categoryId: analisis.id,
      },
    }),

    prisma.article.upsert({
      where: { slug: "cosmeticos-skincare-sephora-guvery" },
      update: {},
      create: {
        title: "Cosméticos y skincare desde Sephora con Guvery",
        slug: "cosmeticos-skincare-sephora-guvery",
        excerpt:
          "Fenty Beauty, The Ordinary, Charlotte Tilbury... ¿llegan en buen estado? Mi experiencia trayendo cosméticos líquidos y en polvo desde Estados Unidos.",
        content: `
## Skincare y maquillaje desde USA con Guvery

Llevo 2 años comprando mis skincare favoritos desde USA con Guvery. Esta es mi guía definitiva.

## ¿Los líquidos son un problema?

Esta es la pregunta más frecuente. La respuesta: **depende del viajero y el embalaje**.

Los viajeros llevan los cosméticos en su equipaje documentado (no carry-on), así que las restricciones de líquidos de 100ml no aplican. Sin embargo, sí hay que protegerlos bien.

**Lo que funciona bien:**
- Sérum en frasco de vidrio con tapa segura
- Cremas en tarro (bien cerradas)
- Polvos compactos y sueltos
- Maquillaje en barra (labiales, correctores stick)

**Lo que puede ser riesgoso:**
- Frascos spray (el cambio de presión puede hacer que gotee)
- Productos con packaging muy delicado

## Mis compras favoritas

**The Ordinary Niacinamide 10%** ($7 en Sephora vs S/ 65 en Lima)
**Charlotte Tilbury Hollywood Flawless Filter** ($44 vs S/ 195)
**Fenty Beauty Pro Filt'r Foundation** ($36 vs S/ 165)
**CeraVe Moisturizing Cream 16oz** ($18 vs S/ 75)

## Cómo pedir correctamente

Al publicar tu pedido:
1. Especifica que son cosméticos/líquidos
2. Pide al viajero que los proteja en bolsa zip-lock
3. Elige viajeros con experiencia en esta categoría
4. Para productos muy delicados, pide embalaje especial (algunos viajeros cobran un pequeño extra)

## Aduanas y cosméticos

Los cosméticos para uso personal no tienen restricciones especiales en aduana peruana. Solo asegúrate de no pedir cantidades que parezcan para reventa.
        `.trim(),
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date("2024-05-28"),
        featuredImage: "https://picsum.photos/seed/cosmetics-beauty/600/300",
        metaTitle: "Cosméticos y skincare desde Sephora con Guvery | Blog",
        metaDescription:
          "Guía completa para comprar cosméticos y skincare desde Sephora USA con Guvery: qué productos traer, cómo empacarlos y cuánto ahorras.",
        categoryId: belleza.id,
      },
    }),
  ]);

  console.log(`✅ ${articles.length} articles created`);

  // ─── Subscribers ──────────────────────────────────────────────────────────
  const subscribers = await Promise.all([
    prisma.subscriber.upsert({
      where: { email: "maria@example.com" },
      update: {},
      create: {
        email: "maria@example.com",
        source: "blog",
        status: SubscriberStatus.ACTIVE,
      },
    }),
    prisma.subscriber.upsert({
      where: { email: "carlos@example.com" },
      update: {},
      create: {
        email: "carlos@example.com",
        source: "blog",
        status: SubscriberStatus.ACTIVE,
      },
    }),
    prisma.subscriber.upsert({
      where: { email: "ana@example.com" },
      update: {},
      create: {
        email: "ana@example.com",
        source: "homepage",
        status: SubscriberStatus.ACTIVE,
      },
    }),
    prisma.subscriber.upsert({
      where: { email: "jose@example.com" },
      update: {},
      create: {
        email: "jose@example.com",
        source: "blog",
        status: SubscriberStatus.INACTIVE,
        unsubscribedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ ${subscribers.length} subscribers created`);

  // ─── Admin User ───────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@guvery.com" },
    update: {},
    create: {
      email: "admin@guvery.com",
      name: "Admin Guvery",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user created: ${adminUser.email}`);
  console.log(`   Password: admin123`);

  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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
  ]);

  console.log(`✅ ${categories.length} categories created`);

  const [guias, comparativas, comoFunciona] = categories;

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

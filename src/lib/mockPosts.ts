// src/lib/mockPosts.ts
// Datos mock para el blog de reseñas — sin base de datos.

export type MockPostRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface MockPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  role: MockPostRole;
  createdAt: string; // ISO string YYYY-MM-DD
}

export const mockPosts: MockPost[] = [
  {
    id: "1",
    title: "Excelente experiencia con Guvery",
    content:
      "Desde el primer momento que usé Guvery me sentí muy acompañado. El proceso de compra fue claro y transparente. Mi paquete llegó en perfectas condiciones y antes del tiempo estimado. Sin duda lo recomiendo a cualquier persona que quiera comprar desde el extranjero sin complicaciones.\n\nLo que más me gustó fue la atención al cliente: respondieron todas mis dudas en menos de 2 horas. Definitivamente volveré a usar el servicio.",
    excerpt:
      "Desde el primer momento que usé Guvery me sentí muy acompañado. El proceso fue claro y mi paquete llegó antes del tiempo estimado.",
    author: "Juan Pérez",
    role: "USER",
    createdAt: "2026-03-10",
  },
  {
    id: "2",
    title: "El mejor servicio de importación personal",
    content:
      "Como administrador del sistema, puedo confirmar que Guvery ha optimizado notablemente los procesos de importación personal. La plataforma es intuitiva, los guieros son responsables y el sistema de tracking es muy preciso.\n\nHemos recibido cientos de reseñas positivas de usuarios que destacan la confiabilidad del servicio. Recomendado al 100%.",
    excerpt:
      "Como administrador confirmo que Guvery ha optimizado los procesos de importación personal. La plataforma es intuitiva y los guieros son responsables.",
    author: "Admin Guvery",
    role: "ADMIN",
    createdAt: "2026-03-08",
  },
  {
    id: "3",
    title: "Compré mis zapatillas Nike desde USA sin problemas",
    content:
      "Siempre tuve miedo de comprar desde el extranjero, pero Guvery cambió eso. Compré unas zapatillas Nike en Amazon y llegaron en 12 días hábiles. El guiero fue muy puntual y el empaque estaba intacto.\n\nEl precio final fue bastante razonable comparado con comprarlas acá en Perú. La app es fácil de usar y puedes ver el estado de tu pedido en todo momento.",
    excerpt:
      "Siempre tuve miedo de comprar desde el extranjero, pero Guvery cambió eso. Mis Nike llegaron en 12 días, en perfecto estado y a buen precio.",
    author: "María Quispe",
    role: "USER",
    createdAt: "2026-03-05",
  },
  {
    id: "4",
    title: "Recomendado para electrónicos",
    content:
      "Compré un iPad Pro desde Best Buy usando Guvery y la experiencia fue muy buena. El guiero fue muy cuidadoso con el dispositivo. Llegó con la garantía internacional incluida y en caja sellada.\n\nEl único punto a mejorar sería el tiempo de respuesta en el chat, a veces tarda un poco. Pero en general es un servicio 5 estrellas.",
    excerpt:
      "Compré un iPad Pro desde Best Buy y llegó con garantía internacional, caja sellada y en perfecto estado. Servicio 5 estrellas.",
    author: "Carlos Mendoza",
    role: "USER",
    createdAt: "2026-03-01",
  },
  {
    id: "5",
    title: "Plataforma robusta y confiable",
    content:
      "Desde la perspectiva de super administración, Guvery representa un modelo de negocio sólido que conecta compradores peruanos con el mercado norteamericano de manera eficiente y segura.\n\nLa infraestructura tecnológica es estable, los procesos de validación de guieros son rigurosos y la experiencia del usuario ha mejorado significativamente en los últimos meses.",
    excerpt:
      "Desde la perspectiva de super administración, Guvery es un modelo de negocio sólido con infraestructura estable y procesos rigurosos.",
    author: "Super Admin",
    role: "SUPER_ADMIN",
    createdAt: "2026-02-25",
  },
  {
    id: "6",
    title: "Mi primera compra internacional fue un éxito",
    content:
      "Nunca había comprado nada del extranjero y tenía muchas dudas. Usé Guvery para comprar unos auriculares Bose en Amazon y todo salió perfecto.\n\nEl proceso es muy simple: creas tu pedido, el guiero lo compra, lo envía y tú lo recibes en casa. Pagué en soles, lo cual fue muy conveniente. ¡Ya tengo mi segunda compra en camino!",
    excerpt:
      "Mi primera compra internacional fue un éxito total. Auriculares Bose desde Amazon, proceso simple y pago en soles. Ya tengo mi segunda compra en camino.",
    author: "Lucía Flores",
    role: "USER",
    createdAt: "2026-02-20",
  },
];

export const site = {
  // ── MARCA ──
  brand: {
    name: 'Espressarte',
    tagline: 'Cafetería de especialidad · Montevideo',
    slogan: 'El arte de la precisión en cada extracción.',
    founded: '2024',
  },

  // ── CONTACTO Y WHATSAPP ──
  contact: {
    whatsapp: '59899123456', // Número sin espacios ni símbolos (+598...)
    whatsappLabel: 'Reservar mesa',
    whatsappStatus: 'Barra abierta · Respuesta rápida',
    messages: {
      default: 'Hola Espressarte! Quisiera hacer una consulta.',
      reservation: 'Hola Espressarte! Quisiera reservar una mesa.',
      order: 'Hola Espressarte! Quisiera consultar por un pedido para llevar.',
    },
    email: 'hola@espressarte.com',
    phone: '+598 99 123 456',
    address: 'Calle Ejemplo 1234, Montevideo',
    title: 'Visitanos',
    subtitle: 'Estamos a unas cuadras de la plaza. Vení cuando quieras.',
    hours: [
      { days: 'Lunes a Viernes', time: '8:00 — 20:00' },
      { days: 'Sábado', time: '9:00 — 21:00' },
      { days: 'Domingo', time: '10:00 — 18:00' },
    ],
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8548!2d-56.1645!3d-34.9011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU0JzA0LjAiUyA1NsKwMDknNTIuMiJX!5e0!3m2!1ses!2suy!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Calle+Ejemplo+1234+Montevideo',
  },

  // ── NAVEGACIÓN ──
  nav: [
    { label: 'Nuestra historia', href: '#philosophy' },
    { label: 'Carta', href: '#sensory-menu' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Visitanos', href: '#contact' },
  ],

  // ── HERO ──
  hero: {
    videoSrc: '/assets/hero-latte.mp4',
    slides: [
      { title: 'Iced Latte', subtitle: 'La espiral de leche', index: '01' },
      { title: 'Espresso Solo', subtitle: 'El corazón de la casa', index: '02' },
      { title: 'Cold Brew', subtitle: 'Extracción lenta, 18 horas', index: '03' },
    ],
  },

  // ── MARQUEE ──
  marquee: [
    'Espresso',
    'Flat white',
    'Cold brew',
    'Latte helado',
    'Croissant de pistacho',
    'Café de origen',
  ],

  // ── STORY ──
  story: {
    title: 'El arte de la precisión en cada extracción.',
    paragraph:
      'En Espressarte seleccionamos granos de origen único tostados a fuego lento. Analizamos la presión, molienda y temperatura para ofrecer una sinfonía de sabores equilibrados.',
    stats: [
      { value: '100%', label: 'Arábica de especialidad' },
      { value: '86+', label: 'Puntaje de cata SCA' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
        alt: 'Extracción de espresso',
        caption: 'Extracción de precisión',
        height: 'h-72',
      },
      {
        src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
        alt: 'Latte art',
        caption: 'Microespuma sedosa',
        height: 'h-[22rem]',
        offset: 'sm:mt-10',
      },
    ],
  },

  // ── MENÚ ──
  menu: {
    title: 'Nuestra Carta',
    subtitle: 'Todo lo que te gusta, a un clic.',
    filters: [
      { id: 'all', label: 'Todos' },
      { id: 'espresso', label: 'Espresso' },
      { id: 'milk', label: 'Con leche' },
      { id: 'cold', label: 'Fríos' },
      { id: 'pastry', label: 'Pastelería' },
    ],
    items: [
      {
        id: 1,
        name: 'Iced Latte Artisanal',
        category: 'Espresso & Milk',
        notes: 'milk',
        profile: 'Notas a cacao, caramelo suave y textura sedosa.',
        price: '$ 240',
        tag: 'Popular',
        intensity: '3/5',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 2,
        name: 'Flat White Velvet',
        category: 'Hot Coffee',
        notes: 'milk',
        profile: 'Doble shot de espresso con dulzor natural de la leche cremada.',
        price: '$ 210',
        tag: 'Chef Choice',
        intensity: '4/5',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 3,
        name: 'Cold Brew Vanilla Bean',
        category: 'Cold Brewed',
        notes: 'cold',
        profile: '18 horas de extracción lenta con destellos florales y vainilla natural.',
        price: '$ 250',
        tag: 'Seasonal',
        intensity: '2/5',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 4,
        name: 'Espresso Solo',
        category: 'Espresso',
        notes: 'espresso',
        profile: 'Un solo shot, extraído al punto justo. Cuerpo intenso y persistente.',
        price: '$ 140',
        tag: 'Clásico',
        intensity: '5/5',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 5,
        name: 'Cappuccino Clásico',
        category: 'Espresso & Milk',
        notes: 'milk',
        profile: 'Espresso con leche vaporizada y una corona generosa de espuma.',
        price: '$ 195',
        tag: 'Clásico',
        intensity: '3/5',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 6,
        name: 'Cortado Ibérico',
        category: 'Espresso & Milk',
        notes: 'milk',
        profile: 'Espresso cortado con un toque de leche caliente. Equilibrio perfecto.',
        price: '$ 180',
        tag: 'Nuevo',
        intensity: '4/5',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 7,
        name: 'Latte Vainilla',
        category: 'Espresso & Milk',
        notes: 'milk',
        profile: 'Latte clásico con un toque de vainilla natural de Madagascar.',
        price: '$ 220',
        tag: 'Popular',
        intensity: '2/5',
        image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 8,
        name: 'Croissant de Pistacho',
        category: 'Pastry Studio',
        notes: 'pastry',
        profile: 'Mantequilla de Normandía con relleno cremoso de pistachos de Sicilia.',
        price: '$ 220',
        tag: 'Fresh Baked',
        intensity: '1/5',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
      },
      {
        id: 9,
        name: 'Alfajor de Dulce de Leche',
        category: 'Pastry Studio',
        notes: 'pastry',
        profile: 'Receta artesanal con dulce de leche repostero y baño de chocolate.',
        price: '$ 160',
        tag: 'Artesanal',
        intensity: '1/5',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
      },
    ],
  },

  // ── GALLERY ──
  gallery: {
    title: 'Momentos de la casa',
    subtitle: 'Un vistazo a lo que pasa todos los días en nuestra barra.',
    instagram: 'https://instagram.com/espressarte',
    instagramLabel: 'Seguinos en Instagram',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
        alt: 'Barista preparando espresso',
        caption: 'La barra a las 8am',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
        alt: 'Latte art',
        caption: 'Microespuma',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
        alt: 'Granos de café molidos',
        caption: 'Recién molidos',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
        alt: 'Extracción de espresso',
        caption: 'La extracción',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800',
        alt: 'Interior de cafetería',
        caption: 'Nuestro rincón',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&q=80&w=800',
        alt: 'Flat white',
        caption: 'Flat white',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800',
        alt: 'Barista trabajando',
        caption: 'El oficio',
        span: 'aspect-square',
      },
      {
        src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
        alt: 'Taza de café vista desde arriba',
        caption: 'Desde arriba',
        span: 'aspect-square',
      },
    ],
  },

  // ── TESTIMONIALS ──
  testimonials: {
    title: 'Lo que dicen de nosotros',
    subtitle: 'Reseñas reales de clientes que vuelven todas las semanas.',
    items: [
      { quote: 'El mejor flat white de Montevideo. El lugar perfecto para trabajar un rato con buena música.', author: 'Lucía Fernández', role: 'Cliente frecuente', stars: 5 },
      { quote: 'La atención es impecable y el café siempre está en su punto. Se nota el cuidado en cada detalle.', author: 'Martín Rodríguez', role: 'Barista aficionado', stars: 5 },
      { quote: 'Vengo desde hace un año. El cold brew es adictivo y el ambiente invita a quedarse.', author: 'Sofía Méndez', role: 'Diseñadora', stars: 5 },
      { quote: 'Probé muchos cafés de especialidad y este es de los pocos que mantiene la calidad siempre.', author: 'Diego Álvarez', role: 'Fotógrafo', stars: 5 },
    ],
  },

  // ── NEWSLETTER ──
  newsletter: {
    eyebrow: 'Mantenete al tanto',
    title: 'Novedades de la casa',
    subtitle: 'Nuevos orígenes, catas y eventos. Una vez al mes, sin spam.',
    placeholder: 'tu@email.com',
    ctaLabel: 'Suscribirme',
    successMessage: 'Gracias por suscribirte. Te vamos a escribir pronto.',
    privacy: 'Sin spam. Podés darte de baja cuando quieras.',
  },

  // ── FOOTER ──
  footer: {
    title: 'Reservá tu mesa',
    paragraph: 'Escribinos por WhatsApp y te guardamos un lugar en la barra o salón.',
    ctaLabel: 'Reservar por WhatsApp',
  },

  // ── PRELOADER ──
  preloader: {
    header: 'Espressarte · Specialty Coffee',
    statuses: [
      { max: 18, text: 'Moliendo los granos' },
      { max: 50, text: 'Calibrando la presión' },
      { max: 80, text: 'Extrayendo el espresso' },
      { max: 100, text: 'Formando la crema' },
    ],
    finalText: 'Recién servido',
    progressLabel: 'PROCESO DE EXTRACCIÓN',
  },
};

// ── HELPERS DERIVADOS ──
export const buildWhatsAppUrl = (customMessage) => {
  const msg = customMessage || site.contact.messages.reservation || site.contact.messages.default;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
};

export const WHATSAPP_URL = buildWhatsAppUrl();
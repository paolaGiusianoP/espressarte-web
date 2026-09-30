# Espressarte — Café de Especialidad

Sitio web y landing page promocional para **Espressarte**, una cafetería de especialidad enfocada en tostado artesanal, repostería y una experiencia gastronómica cuidada. 

Diseñado con una interfaz oscura, moderna y *responsive*, que integra conversión directa a través de reservas y consultas por WhatsApp.

---

## Tecnologías Utilizadas

* **Frontend:** React + Vite
* **Estilos:** Tailwind CSS
* **Iconos:** Lucide React / SVG
* **Tipografías:** Playfair Display (Serif) & Inter (Sans)
* **Despliegue:** Vercel

---

## Características Principales

* **Landing Page Interactiva:** Secciones de Historia, Carta / Menú dinámico, Galería visual y Contacto.
* **Integración con WhatsApp:** Generación dinámica de mensajes predeterminados para consultas sobre el menú y reservas de mesa.
* **UI/UX Optimizado:** 
  * Navbar inteligente que se oculta suavemente al hacer scroll hacia abajo y solo reaparece en la sección del Hero.
  * Botón flotante de WhatsApp (`WhatsAppFloat`) optimizado para conversión en dispositivos móviles.
  * Ocultamiento automático del botón flotante al llegar al footer para evitar solapamientos visuales.
* **SEO y Open Graph:** Configuración de metadatos para optimizar motores de búsqueda y previsualizaciones al compartir enlaces en redes sociales y mensajería.

---

##  Estructura del Proyecto

```text
espressarte/
├── public/
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Story.jsx
│   │   ├── Menu.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppFloat.jsx
│   ├── data/
│   │   └── site.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vercel.json
├── package.json
└── README.md

```
---

##  Licencia

Este proyecto fue desarrollado bajo la licencia MIT.

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Rise } from './Rise';
import { Section } from './Section';
import { site } from '../data/site';

export const Gallery = () => {
  const [lightbox, setLightbox] = useState(null); 

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  const images = site.gallery.images;
  const current = lightbox !== null ? images[lightbox] : null;

  return (
    <Section id="gallery" tone="dark">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-coffee-700/40 pb-8 lg:flex-row lg:items-end">
          <div>
            <Rise
              text={site.gallery.title}
              className="font-serif text-4xl text-white sm:text-5xl"
            />
            {site.gallery.subtitle && (
              <p className="mt-3 max-w-md text-sm text-[#a8907e]">
                {site.gallery.subtitle}
              </p>
            )}
          </div>
          {site.gallery.instagram && (
            <a
              href={site.gallery.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.3em] text-[#a8907e] transition-colors hover:text-[#d4a373] lg:self-auto"
            >
              {site.gallery.instagramLabel || 'Ver Instagram'}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>

        {/* Grid masonry-like */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightbox(i)}
              className={`
                group relative overflow-hidden rounded-2xl
                ${img.span || 'aspect-square'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373]
              `}
              aria-label={`Abrir imagen: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
              />
              {/* Overlay que aparece en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Caption */}
              {img.caption && (
                <span className="absolute bottom-3 left-3 translate-y-2 font-serif text-sm italic text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && createPortal(
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-coffee-950/95 p-6 backdrop-blur-md"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-coffee-300/30 text-coffee-100 transition-colors hover:border-coffee-300 hover:bg-coffee-300 hover:text-coffee-950"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-coffee-300/30 text-2xl text-coffee-100 transition-colors hover:border-coffee-300 hover:bg-coffee-300 hover:text-coffee-950 md:left-10"
            aria-label="Anterior"
          >
            ‹
          </button>

          {/* Imagen */}
          <figure
            className="max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            {current.caption && (
              <figcaption className="mt-4 text-center font-serif text-sm italic text-[#c2b2a3]">
                {current.caption}
              </figcaption>
            )}
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-coffee-300/30 text-2xl text-coffee-100 transition-colors hover:border-coffee-300 hover:bg-coffee-300 hover:text-coffee-950 md:right-10"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </Section>
  );
};
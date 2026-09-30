import React from 'react';
import { Rise } from './Rise';
import { Section } from './Section';
import { site, WHATSAPP_URL } from '../data/site';

export const Contact = () => {
  const { address, hours, phone, email, mapEmbed, mapLink } = site.contact;

  return (
    <Section id="contact" tone="dark">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="border-b border-coffee-700/40 pb-8">
          <Rise
            text={site.contact.title || 'Visitanos'}
            className="font-serif text-4xl text-white sm:text-5xl"
          />
          {site.contact.subtitle && (
            <p className="mt-3 max-w-md text-sm text-[#a8907e]">
              {site.contact.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Info */}
          <div className="space-y-10 lg:col-span-5">
            {/* Dirección */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a373]">
                Dirección
              </p>
              <a
                href={mapLink || `https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-serif text-2xl leading-tight text-white transition-colors hover:text-[#d4a373]"
              >
                {address}
              </a>
            </div>

            {/* Horarios */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a373]">
                Horarios
              </p>
              <ul className="mt-3 space-y-2.5">
                {hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-baseline justify-between gap-4 border-b border-coffee-700/30 pb-2.5 text-sm"
                  >
                    <span className="text-[#c2b2a3]">{h.days}</span>
                    <span className="font-mono text-[#f7f3ed]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a373]">
                Contacto
              </p>
              <div className="mt-3 space-y-2">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block text-sm text-[#c2b2a3] transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="block text-sm text-[#c2b2a3] transition-colors hover:text-white"
                  >
                    {email}
                  </a>
                )}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a373] transition-colors hover:text-white"
                >
                  Escribinos por WhatsApp
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-7">
            <div
              className="relative h-[420px] overflow-hidden rounded-3xl border border-coffee-700/40 lg:h-full"
              style={{ minHeight: '420px' }}
            >
              {mapEmbed ? (
                <>
                  <iframe
                    src={mapEmbed}
                    title={`Mapa de ${site.brand.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    style={{
                      border: 0,
                      filter: 'grayscale(0.6) sepia(0.35) saturate(0.7) contrast(1.05) brightness(0.75)',
                    }}
                    allowFullScreen
                  />
                  {/* Overlay cálido que unifica con la paleta */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 50%, rgba(212,163,115,0.15) 0%, rgba(23,13,9,0.35) 100%)',
                    }}
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#a8907e]">
                  Configurá <code className="mx-1 rounded bg-coffee-900 px-2 py-1">contact.mapEmbed</code> en site.js
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
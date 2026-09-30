import React, { useEffect, useState } from 'react';
import { site, WHATSAPP_URL } from '../data/site';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? 'border-b border-[#8c5a3c]/20 bg-[#170d09]/85 py-3 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent py-6'
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-8 lg:px-14">
          {/* Logo */}
          <a
            href="#"
            onClick={close}
            className="font-serif text-base normal-case italic tracking-normal text-[#f7f3ed] transition-opacity hover:opacity-80"
          >
            {site.brand.name}
          </a>

          {/* Links desktop */}
          <nav
            aria-label="Navegación principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#c2b2a3] md:flex"
          >
            {site.nav.map((item, i) => (
              <React.Fragment key={item.href}>
                {i > 0 && <span className="text-[#8c5a3c]/60">|</span>}
                <a
                  href={item.href}
                  className="transition-colors hover:text-[#d4a373]"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* CTA desktop + hamburguesa mobile */}
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-[#d4a373]/40 bg-[#d4a373]/10 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] font-medium text-[#d4a373] backdrop-blur-sm transition-all hover:border-[#d4a373] hover:bg-[#d4a373] hover:text-[#170d09] sm:inline-flex"
            >
              Reservar
            </a>

            {/* Hamburguesa */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center text-[#f7f3ed] transition-colors hover:text-[#d4a373] md:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      <div
        aria-hidden={!open}
        className={`
          fixed inset-0 z-40 bg-[#170d09] transition-opacity duration-500 md:hidden
          ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-8">
          <nav aria-label="Navegación principal" className="flex flex-col items-center gap-6">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="font-serif text-3xl italic text-[#f7f3ed] transition-colors hover:text-[#d4a373]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 rounded-full border border-[#d4a373]/40 bg-[#d4a373]/10 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.25em] font-medium text-[#d4a373] transition-all hover:bg-[#d4a373] hover:text-[#170d09]"
          >
            Reservar mesa
          </a>
        </div>
      </div>
    </>
  );
};
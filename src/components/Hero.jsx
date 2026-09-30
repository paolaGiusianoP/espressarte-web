import React, { useRef, useEffect, useState } from 'react';
import { site } from '../data/site';

const clamp = (n) => Math.min(1, Math.max(0, n));
const LOOK = 'atmospheric';
const IS_SHOWCASE = LOOK === 'showcase';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Hero = ({ ready = true }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const activeRef = useRef('A');
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    const cover = document.getElementById('cover');
    if (!inner || !cover || prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = cover.getBoundingClientRect().top;
      const q = clamp(1 - top / vh);
      inner.style.transform = `scale(${1 - q * 0.07})`;
      inner.style.filter = q > 0.001 ? `brightness(${1 - q * 0.6})` : '';
      const curve = Math.min(window.innerWidth * 0.09, Math.max(0, top * 0.2));
      cover.style.borderRadius = `50% 50% 0 0 / ${curve}px ${curve}px 0 0`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b || !ready) return;

    const FADE = 0.8;
    a.currentTime = 0;
    b.currentTime = 0;
    a.style.opacity = '1';
    b.style.opacity = '0';
    activeRef.current = 'A';
    if (prefersReducedMotion()) return; 

    a.play().catch(() => {});
    b.pause();

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      [a, b].forEach((v) => {
        if (!visible) v.pause();
        else if (v.style.opacity !== '0') v.play().catch(() => {});
      });
    });
    io.observe(wrapRef.current);

    const tick = () => {
      if (visible) {
        const active = activeRef.current === 'A' ? a : b;
        const inactive = activeRef.current === 'A' ? b : a;

        if (active.duration) {
          const remaining = active.duration - active.currentTime;

          if (inactive.paused && remaining <= FADE) {
            inactive.currentTime = 0;
            inactive.play().catch(() => {});
          }
          if (remaining <= FADE && remaining > 0) {
            const t = 1 - remaining / FADE;
            active.style.opacity = `${1 - t}`;
            inactive.style.opacity = `${t}`;
          }
          if (remaining <= 0.1 || active.ended) {
            inactive.style.opacity = '1';
            active.style.opacity = '0';
            active.pause();
            active.currentTime = 0;
            activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ready]);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const { top, height } = wrapRef.current.getBoundingClientRect();
      setHintHidden(clamp(-top / (height - window.innerHeight)) > 0.05);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;
    let raf = 0, px = 0, py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty('--px', px.toFixed(3));
      el.style.setProperty('--py', py.toFixed(3));
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const videoStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    opacity: 0,
    transition: 'opacity 200ms linear',
    WebkitMaskImage:
      'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, rgba(0,0,0,0.5) 70%, transparent 100%)',
    maskImage:
      'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, rgba(0,0,0,0.5) 70%, transparent 100%)',
  };

  const enter = ready ? 'enter' : 'opacity-0';
  const tagParts = (site.brand.tagline || '').split('·').map((t) => t.trim()).filter(Boolean);

  return (
    <section
      ref={wrapRef}
      className="relative h-[240vh] bg-[#170d09] text-[#f7f3ed] motion-reduce:h-auto"
    >
      <div
        ref={innerRef}
        className="sticky top-0 flex h-screen origin-top flex-col overflow-hidden bg-[#170d09] bg-grain will-change-transform motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-screen"
      >
        {/* Viñeta radial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(212,163,115,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Espaciador para el Navbar fixed */}
        <div className="h-20 shrink-0 lg:h-24" />

        {/* ESCENARIO */}
        <div className="relative z-10 min-h-0 flex-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-full w-full"
              style={{
                maxWidth: '880px',
                margin: '0 auto',
                opacity: IS_SHOWCASE ? 1 : 0.78,
                filter: IS_SHOWCASE ? 'none' : 'brightness(0.9) contrast(1.05) saturate(0.9)',
                transform: 'translate3d(calc(var(--px, 0) * -16px), calc(var(--py, 0) * -10px), 0)',
                transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <video ref={videoARef} muted playsInline preload="auto" aria-label="Video de la cafetería" style={videoStyle}>
                <source src={site.hero.videoSrc} type="video/mp4" />
              </video>
              <video ref={videoBRef} muted playsInline preload="auto" aria-hidden="true" style={videoStyle}>
                <source src={site.hero.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Oscurecido suave hacia los bordes: el centro queda limpio para que se vea el vaso */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[15]"
            style={{
              background:
                IS_SHOWCASE
                ? 'linear-gradient(to top, rgba(23,13,9,0.88) 0%, rgba(23,13,9,0) 42%), radial-gradient(ellipse at 50% 45%, rgba(23,13,9,0.15) 0%, rgba(23,13,9,0.35) 100%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(23,13,9,0.3) 0%, rgba(23,13,9,0.6) 100%)',
            }}
          />

          {/* TEXTO: abajo, para no tapar el vaso */}
          <div
            className={`pointer-events-none relative z-20 flex h-full flex-col items-center px-8 text-center ${IS_SHOWCASE ? 'justify-end pb-[4vh]' : 'justify-center'}`}
            style={{
              transform: 'translate3d(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 5px), 0)',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p
              className={`${enter} mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[#d4a373] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${IS_SHOWCASE ? 'md:hidden' : ''}`}
              style={{ animationDelay: '.2s' }}
            >
              {site.brand.tagline}
            </p>

            <h1
              className={`${enter} font-serif italic leading-[0.9] tracking-[-0.03em] text-[#e8c9a0]`}
              style={{
                fontSize: 'clamp(3rem, 9vw, 10rem)',
                animationDelay: '.4s',
                filter:
                  'drop-shadow(0 6px 40px rgba(212,163,115,0.35)) drop-shadow(0 2px 10px rgba(0,0,0,0.7))',
              }}
            >
              {site.brand.name}
            </h1>
          </div>

          {/* A los lados del vaso: llenan el espacio vacío y sacan el tagline de la leche */}
          {IS_SHOWCASE && tagParts[0] && (
            <div className="pointer-events-none absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 md:block lg:left-14">
              <div className={enter} style={{ animationDelay: '.9s' }}>
                <span className="block h-px w-10 bg-[#8c5a3c]/60" />
                <p className="mt-4 max-w-[16ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.35em] text-[#d4a373]">
                  {tagParts[0]}
                </p>
              </div>
            </div>
          )}
          {IS_SHOWCASE && (
          <div className="pointer-events-none absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 text-right md:block lg:right-14">
            <div className={enter} style={{ animationDelay: '1s' }}>
              <span className="ml-auto block h-px w-10 bg-[#8c5a3c]/60" />
              {tagParts[1] && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a373]">{tagParts[1]}</p>
              )}
              {site.brand.founded && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#8c5a3c]">
                  Est. {site.brand.founded}
                </p>
              )}
            </div>
          </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="relative z-30 flex w-full items-center justify-center px-8 pb-8 pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#a8907e] lg:px-14">
          <div className={`${enter} flex flex-col items-center gap-4`} style={{ animationDelay: '.7s' }}>
            <a
              href="#sensory-menu"
              className="rounded-full border border-[#d4a373]/40 bg-[#d4a373]/10 px-7 py-3 font-medium text-[#d4a373] backdrop-blur-sm transition-all hover:border-[#d4a373] hover:bg-[#d4a373] hover:text-[#170d09]"
            >
              Ver la carta
            </a>
            <span
              className={`flex items-center gap-2 text-[9px] tracking-[0.4em] text-[#8c5a3c]/80 transition-opacity duration-700 ${
                hintHidden ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span className="relative block h-6 w-px overflow-hidden bg-[#8c5a3c]/40">
                <span
                  className="block h-2.5 w-px bg-[#d4a373]"
                  style={{ animation: 'scrollHint 1.8s ease-in-out infinite' }}
                />
              </span>
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
import React, { useRef, useState, useEffect } from 'react';
import { Rise } from './Rise';
import { Reveal } from './Reveal';           
import { useMeniscus } from './useMeniscus';
import { site } from '../data/site';

const INITIAL_COUNT = 6;
const STEP = 6;

export const Menu = () => {
  const ref = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  useMeniscus(ref);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeFilter]);

  const filtered =
    activeFilter === 'all'
      ? site.menu.items
      : site.menu.items.filter((i) => i.notes === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasExpanded = visibleCount > INITIAL_COUNT;

  const showMore = () => setVisibleCount((c) => c + STEP);
  const showLess = () => {
    setVisibleCount(INITIAL_COUNT);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={ref}
      id="sensory-menu"
      className="relative z-20 -mt-[9vw] bg-coffee-950 bg-grain px-8 pb-[calc(9vw+4rem)] pt-[calc(9vw+5rem)] text-coffee-100"
      style={{ borderRadius: '50% 50% 0 0 / 9vw 9vw 0 0' }}
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-coffee-700/40 pb-8 lg:flex-row lg:items-end">
          <div>
            <Rise
              text={site.menu.title}
              className="font-serif text-4xl text-white sm:text-5xl"
            />
            {site.menu.subtitle && (
              <p className="mt-3 max-w-md text-sm text-[#a8907e]">
                {site.menu.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {site.menu.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={activeFilter === f.id}
                className={`rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-coffee-300 font-semibold text-coffee-950'
                    : 'border border-coffee-700 text-[#a8907e] hover:border-coffee-300 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => {
            const level = parseInt(item.intensity, 10);
            return (
              <Reveal
                key={`${activeFilter}-${item.id}`}
                as="article"
                delay={(i % STEP) * 70}
                className="group flex flex-col overflow-hidden rounded-3xl border border-coffee-700/50 bg-coffee-900/60 transition-all duration-500 hover:border-coffee-300/40 hover:bg-coffee-900"
              >
                {/* Imagen con precio y tag */}
                <div className="relative aspect-[4/3] overflow-hidden bg-coffee-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-coffee-300/30 bg-coffee-950/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-coffee-300 backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span className="absolute bottom-3 left-3 font-mono text-2xl font-semibold tabular-nums text-[#e8c9a0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {item.price}
                  </span>
                </div>

                {/* Cuerpo */}
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-serif text-xl leading-tight text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[#a8907e]">
                      {item.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#c2b2a3]">
                      {item.profile}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-coffee-700/40 pt-4 text-xs text-[#a8907e]">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
                      Intensidad
                    </span>
                    <span
                      className="flex gap-1"
                      role="img"
                      aria-label={`Intensidad ${item.intensity}`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`h-1 w-4 rounded-full ${
                            n <= level ? 'bg-coffee-300' : 'bg-coffee-700'
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-coffee-700/60 p-12 text-center">
            <p className="text-sm text-[#a8907e]">
              No hay productos en esta categoría todavía.
            </p>
          </div>
        )}

        {/* Botones Ver más / Ver menos */}
        {(hasMore || hasExpanded) && (
          <div className="flex justify-center pt-4">
            {hasMore ? (
              <button
                type="button"
                onClick={showMore}
                className="group flex items-center gap-3 rounded-full border border-coffee-300/40 bg-coffee-300/5 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-coffee-300 backdrop-blur-sm transition-all duration-300 hover:border-coffee-300 hover:bg-coffee-300 hover:text-coffee-950"
              >
                Ver más
                <span className="tabular-nums opacity-60">
                  ({filtered.length - visibleCount})
                </span>
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={showLess}
                className="group flex items-center gap-3 rounded-full border border-coffee-700/60 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#a8907e] transition-all duration-300 hover:border-coffee-300 hover:text-coffee-300"
              >
                Ver menos
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
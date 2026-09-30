import React, { useEffect, useState } from 'react';
import { Rise } from './Rise';
import { Section } from './Section';
import { site } from '../data/site';

export const Testimonials = () => {
  const testimonials = site.testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused, testimonials.length]);

  const current = testimonials[index];

  return (
    <Section
      id="testimonials"
      tone="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <Rise
            text={site.testimonials.title}
            className="font-serif text-4xl leading-tight sm:text-5xl"
          />
          {site.testimonials.subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-sm text-coffee-700">
              {site.testimonials.subtitle}
            </p>
          )}
        </div>

        {/* Cita grande */}
        <div className="relative min-h-[14rem] pt-8">
        {/* Comilla decorativa */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 font-serif text-[10rem] italic leading-none text-coffee-700/[0.08] select-none"
        >
          &ldquo;
        </span>

          <div key={index} className="animate-fade-up relative z-10 text-center">
            <blockquote className="mx-auto max-w-3xl font-serif text-2xl italic leading-snug text-coffee-950 sm:text-3xl md:text-4xl">
              {current.quote}
            </blockquote>

            <div className="mt-8 flex flex-col items-center gap-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-coffee-500">
                {current.author}
              </p>
              {current.role && (
                <p className="text-xs text-coffee-700/80">{current.role}</p>
              )}
              {/* Estrellas */}
              <div className="mt-3 flex gap-1" role="img" aria-label={`${current.stars || 5} de 5 estrellas`}>
                {Array.from({ length: current.stars || 5 }).map((_, i) => (
                  <span key={i} className="text-sm text-coffee-500">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la reseña ${i + 1}`}
                aria-current={index === i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === i ? 'w-8 bg-coffee-500' : 'w-1.5 bg-coffee-700/30 hover:bg-coffee-700/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
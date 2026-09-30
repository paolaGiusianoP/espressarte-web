import React, { useState } from 'react';
import { Rise } from './Rise';
import { Section } from './Section';
import { site } from '../data/site';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación simple
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setError('Ingresá un email válido');
      return;
    }

    setStatus('loading');

    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Hubo un problema. Probá de nuevo.');
    }
  };

  return (
    <Section id="newsletter" tone="light">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-coffee-500">
            {site.newsletter.eyebrow || 'Newsletter'}
          </p>
          <Rise
            text={site.newsletter.title}
            className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
          />
          {site.newsletter.subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-coffee-700">
              {site.newsletter.subtitle}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={submit} className="mt-10" noValidate>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder={site.newsletter.placeholder || 'tu@email.com'}
              aria-label="Email"
              disabled={status === 'loading' || status === 'success'}
              className="
                flex-1 rounded-full border border-coffee-700/20 bg-white/60 px-6 py-4
                font-sans text-sm text-coffee-950 placeholder:text-coffee-700/50
                transition-colors focus:border-coffee-500 focus:bg-white focus:outline-none
                disabled:opacity-60
              "
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="
                group inline-flex shrink-0 items-center justify-center gap-2
                rounded-full bg-coffee-950 px-10 py-4
                min-w-[220px]
                font-mono text-[10px] uppercase tracking-[0.25em] font-semibold
                text-coffee-100 transition-all
                hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-70
              "
            >
              {status === 'loading' && 'Enviando…'}
              {status === 'success' && '¡Listo! ✓'}
              {(status === 'idle' || status === 'error') && (
                <>
                  {site.newsletter.ctaLabel || 'Suscribirme'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Mensajes */}
          {status === 'error' && (
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-red-700/80">
              {error}
            </p>
          )}
          {status === 'success' && (
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-coffee-700">
              {site.newsletter.successMessage || 'Gracias por suscribirte. Te vamos a escribir pronto.'}
            </p>
          )}

          {/* Privacidad */}
          <p className="mt-4 text-center text-xs text-coffee-700/60">
            {site.newsletter.privacy || 'Sin spam. Podés darte de baja cuando quieras.'}
          </p>
        </form>
      </div>
    </Section>
  );
};
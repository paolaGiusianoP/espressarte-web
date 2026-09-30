import React, { useEffect, useState } from 'react';

export const Preloader = ({ onDone, onLift }) => {
  const [phase, setPhase] = useState('active'); 
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const DURATION = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase('ready'), DURATION + 150);
    const t2 = setTimeout(() => {
      setPhase('lift');
      onLift?.();
    }, DURATION + 650);
    const t3 = setTimeout(() => onDone?.(), DURATION + 1650);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone, onLift]);

  const statusText = (v) => {
    if (v < 18) return 'Moliendo los granos';
    if (v < 50) return 'Calibrando la presión';
    if (v < 80) return 'Extrayendo el espresso';
    if (v < 100) return 'Formando la crema';
    return 'Recién servido';
  };

  return (
    <div
      aria-hidden="true"
      className={`
        fixed inset-0 z-[100] overflow-hidden
        bg-[#170d09] text-[#f7f3ed]
        transition-transform duration-[1100ms]
        ease-[cubic-bezier(0.76,0,0.24,1)]
        ${phase === 'lift' ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,163,115,0.22) 0%, rgba(140,90,60,0.08) 45%, transparent 70%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex h-full select-none flex-col items-center justify-between px-6 py-10">

        {/* CENTRO */}
        <div className="my-auto flex flex-col items-center">

          <div className="relative flex flex-col items-center">

            <div className="relative z-20">
              <svg
                viewBox="0 0 60 32"
                className="h-10 w-16 text-[#d4a373]/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M30 2 L30 7" />
                <path d="M12 7 H48 V13 A18 8 0 0 1 12 13 Z" fill="currentColor" fillOpacity="0.12" />
                <path d="M16 10 H44" strokeOpacity="0.5" />
                <path d="M28 15 V19 M32 15 V19" />
              </svg>
            </div>

            <div className="relative z-10 -mt-1 h-14 w-[3px] overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-[#d4a373] via-[#8c5a3c] to-[#3d2118] transition-transform duration-200 ease-out"
                style={{
                  height: '100%',
                  transform: `scaleY(${Math.min(pct / 45, 1)})`,
                  opacity: pct > 4 ? 1 : 0,
                  boxShadow: '0 0 10px rgba(212,163,115,0.55)',
                }}
              />
            </div>

            {/* TAZA */}
            <div className="relative mt-0 h-[86px] w-[150px]">
              <div
                className="absolute bottom-0 left-1/2 h-[12px] w-[168px] -translate-x-1/2 rounded-[50%]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 40%, rgba(212,163,115,0.35), rgba(140,90,60,0.08) 70%, transparent)',
                }}
              />

              <div
                className="absolute right-[6px] top-[18px] h-[38px] w-[26px] rounded-r-full border-[6px] border-[#d4a373]/55"
                style={{
                  borderLeft: 'none',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />

              <svg
                viewBox="0 0 150 86"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f7f3ed" />
                    <stop offset="100%" stopColor="#d9cec3" />
                  </linearGradient>
                  <linearGradient id="coffeeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8c5a3c" />
                    <stop offset="100%" stopColor="#3d2118" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 12
                     Q18 8 24 8
                     H126
                     Q132 8 132 12
                     L124 68
                     Q122 80 110 80
                     H40
                     Q28 80 26 68
                     Z"
                  fill="url(#cupGrad)"
                  stroke="rgba(212,163,115,0.45)"
                  strokeWidth="1"
                />
                <ellipse cx="75" cy="12" rx="56" ry="7" fill="#efe7dd" />
                <ellipse
                  cx="75"
                  cy="12"
                  rx="56"
                  ry="7"
                  fill="url(#coffeeGrad)"
                  style={{
                    transform: `scale(${0.55 + pct / 220})`,
                    transformOrigin: '75px 12px',
                    transition: 'transform 0.4s ease-out',
                  }}
                />
                <ellipse
                  cx="75"
                  cy="12"
                  rx="46"
                  ry="5"
                  fill="#d4a373"
                  style={{
                    opacity: pct > 55 ? Math.min(1, (pct - 55) / 35) : 0,
                    transform: `scale(${Math.max(0, (pct - 55) / 45)})`,
                    transformOrigin: '75px 12px',
                    transition: 'opacity 0.4s, transform 0.6s',
                  }}
                />
              </svg>

              <div
                className={`pointer-events-none absolute -top-2 left-1/2 h-12 w-24 -translate-x-1/2 transition-opacity duration-700 ${
                  pct > 65 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="steam steam-1" />
                <span className="steam steam-2" />
                <span className="steam steam-3" />
              </div>
            </div>
          </div>

          <div className="relative mt-10 select-none">
            <h1
              className="font-serif italic leading-none tracking-[-0.03em] text-[#4a3529]"
              style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}
            >
              Espressarte
            </h1>

            <h1
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#f7f3ed] via-[#d4a373] to-[#8c5a3c] bg-clip-text font-serif italic leading-none tracking-[-0.03em] text-transparent"
              style={{
                fontSize: 'clamp(3rem, 9vw, 6.5rem)',
                clipPath: `inset(${100 - pct}% 0 0 0)`,
                transition: 'clip-path 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Espressarte
            </h1>
          </div>

          {/* Estado */}
          <p className="mt-5 h-4 font-mono text-[9px] uppercase tracking-[0.35em] text-[#d4a373]/80">
            {statusText(pct)}
          </p>
        </div>

        <div className="w-full max-w-xs pb-2">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#8f7769]">
              PROCESO DE EXTRACCIÓN
            </span>
            <span className="font-mono text-[10px] font-semibold tabular-nums tracking-widest text-[#f7f3ed]">
              {String(pct).padStart(3, '0')}%
            </span>
          </div>

          <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#2c1d17]">
            <div
              className="h-full bg-gradient-to-r from-[#8c5a3c] via-[#d4a373] to-[#f7f3ed] transition-all duration-100 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useRef, useState } from 'react';

export const Rise = ({ text, as: Tag = 'h2', className = '' }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className={`inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${on ? 'translate-y-0' : 'translate-y-[110%]'}`}
                style={{ transitionDelay: `${i * 70}ms` }}>
            {w}{'\u00A0'}
          </span>
        </span>
      ))}
    </Tag>
  );
};

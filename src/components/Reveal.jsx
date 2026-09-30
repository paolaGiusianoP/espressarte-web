import React, { useEffect, useRef, useState } from 'react';

export const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSeen(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${seen ? 'enter' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
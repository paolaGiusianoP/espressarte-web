import React, { useRef } from 'react';
import { useMeniscus } from './useMeniscus';

const TONES = {
  dark: 'bg-coffee-950 bg-grain text-coffee-100',
  light: 'bg-coffee-100 text-coffee-950',
  caramel: 'bg-coffee-300 text-coffee-950',
};

export const Section = ({
  id,
  tone = 'dark',
  as: Tag = 'section',
  z = 20,
  tight = false,
  className = '',
  children,
  ...rest
}) => {
  const ref = useRef(null);
  useMeniscus(ref);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`relative -mt-[9vw] px-8 pt-[calc(9vw+5rem)] ${tight ? 'pb-10' : 'pb-[calc(9vw+4rem)]'} ${TONES[tone]} ${className}`}
      style={{ zIndex: z, borderRadius: '50% 50% 0 0 / 9vw 9vw 0 0' }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

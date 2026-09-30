import React from 'react';
import { site } from '../data/site';

export const Marquee = () => (
  <div aria-hidden="true" className="relative overflow-hidden border-y border-coffee-700/40 bg-[#140b08] py-6">
    <div className="marquee flex w-max whitespace-nowrap font-serif text-4xl italic text-coffee-300/80 sm:text-5xl">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {site.marquee.map((w) => (
            <span key={w} className="flex items-center">
              <span className="px-8">{w}</span>
              <span className="text-coffee-500">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
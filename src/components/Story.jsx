import React from 'react';
import { Rise } from './Rise';
import { site } from '../data/site';

export const Story = () => (
  <section
    id="cover"
    className="relative z-10 -mt-[100vh] bg-coffee-100 px-8 pb-[calc(9vw+5rem)] pt-40 text-coffee-950 motion-reduce:mt-0"
    style={{ borderRadius: '50% 50% 0 0 / 9vw 9vw 0 0' }}
  >
    <div id="philosophy" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-5">
        <Rise
          text={site.story.title}
          className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
        />
        <p className="text-base leading-relaxed text-coffee-700">
          {site.story.paragraph}
        </p>
        <div className="grid grid-cols-2 gap-6 border-t border-coffee-700/15 pt-6">
          {site.story.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-coffee-700/15 bg-white/50 p-4">
              <p className="font-serif text-4xl text-coffee-500">{stat.value}</p>
              <p className="mt-1 text-sm text-coffee-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:col-span-7">
        {site.story.images.map((img, i) => (
          <div
            key={img.src}
            className={`group relative overflow-hidden rounded-3xl shadow-xl ${img.height} ${img.offset || ''}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-serif text-sm italic text-white">
              {img.caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
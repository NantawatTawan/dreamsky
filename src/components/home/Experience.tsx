'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  Plus,
  X,
} from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const PHOTOS = [
  'S__26935337_0.jpg',
  'S__26935304_0.jpg',
  'S__26935305_0.jpg',
  'S__26935306_0.jpg',
  'S__26935307_0.jpg',
  'S__26935308_0.jpg',
  'S__26935309_0.jpg',
  'S__26935310_0.jpg',
  'S__26935311_0.jpg',
  'S__26935312_0.jpg',
  'S__26935313_0.jpg',
  'S__26935315_0.jpg',
  'S__26935316_0.jpg',
  'S__26935317_0.jpg',
  'S__26935318_0.jpg',
  'S__26935319_0.jpg',
  'S__26935320_0.jpg',
  'S__26935321_0.jpg',
  'S__26935322_0.jpg',
  'S__26935323_0.jpg',
  'S__26935324_0.jpg',
  'S__26935326_0.jpg',
  'S__26935327_0.jpg',
  'S__26935328_0.jpg',
  'S__26935329_0.jpg',
  'S__26935330_0.jpg',
  'S__26935331_0.jpg',
  'S__26935332_0.jpg',
  'S__26935333_0.jpg',
  'S__26935334_0.jpg',
  'S__26935335_0.jpg',
  'S__26935338_0.jpg',
  'S__26935339_0.jpg',
  'S__26935340_0.jpg',
  'S__26935341_0.jpg',
  'S__26935342_0.jpg',
  'S__26935343_0.jpg',
  'S__26935344_0.jpg',
  'S__26935345_0.jpg',
  'S__26935346_0.jpg',
  'S__26935348_0.jpg',
  'S__26935349_0.jpg',
  'S__26935350_0.jpg',
  'S__26935351_0.jpg',
  'S__26935352_0.jpg',
  'S__26935353_0.jpg',
];

const PREVIEW_COUNT = 4;

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as string[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, close, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const previews = PHOTOS.slice(1, 1 + PREVIEW_COUNT);
  const remaining = PHOTOS.length - 1 - PREVIEW_COUNT;

  return (
    <section className="relative py-20 md:py-28 bg-light">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="relative pl-6 border-l-4 border-orange">
            <h2 className="font-extrabold text-3xl md:text-5xl text-navy leading-tight tracking-tight">
              {t('title')}
            </h2>
            <ul className="mt-8 space-y-5">
              {items.map((line, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="mt-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange font-bold text-sm ring-1 ring-orange/30">
                    {i + 1}
                  </span>
                  <p className="text-dark/80 text-base md:text-lg leading-relaxed">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => open(0)}
              className="group relative block aspect-4/5 md:aspect-4/3 w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-navy/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange/60"
              aria-label={`${t('image_caption')} — open gallery`}
            >
              <Image
                src={`/images/views/${PHOTOS[0]}`}
                alt={t('image_caption')}
                fill
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
                priority
              />

              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/55 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 via-black/30 to-transparent"
              />

              <span
                aria-hidden
                className="absolute top-4 left-4 h-5 w-5 border-t-2 border-l-2 border-orange/90 transition-all duration-300 group-hover:top-3 group-hover:left-3 group-hover:h-7 group-hover:w-7"
              />
              <span
                aria-hidden
                className="absolute top-4 right-4 h-5 w-5 border-t-2 border-r-2 border-orange/90 transition-all duration-300 group-hover:top-3 group-hover:right-3 group-hover:h-7 group-hover:w-7"
              />
              <span
                aria-hidden
                className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-orange/90 transition-all duration-300 group-hover:bottom-3 group-hover:left-3 group-hover:h-7 group-hover:w-7"
              />
              <span
                aria-hidden
                className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-orange/90 transition-all duration-300 group-hover:bottom-3 group-hover:right-3 group-hover:h-7 group-hover:w-7"
              />

              <div className="absolute top-5 inset-x-5 flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold text-white tracking-[0.2em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE · CNX
                </span>
                <span className="rounded-sm bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold text-orange tracking-[0.2em]">
                  ALT 1,200 FT
                </span>
              </div>

              <div className="absolute bottom-5 inset-x-5 flex items-end justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 text-orange shrink-0" />
                  <span className="font-bold text-sm md:text-base drop-shadow-md">
                    {t('image_caption')}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-white font-bold text-xs md:text-sm shadow-lg ring-1 ring-white/30 transition group-hover:gap-2.5 group-hover:pr-3">
                  <Images className="h-4 w-4" />
                  <span>{PHOTOS.length} SHOTS</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>

            <div className="grid grid-cols-4 gap-2">
              {previews.map((p, i) => {
                const idx = i + 1;
                const isLast = i === previews.length - 1 && remaining > 0;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => open(idx)}
                    className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-navy/10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                    aria-label={`Open photo ${idx + 1} of ${PHOTOS.length}`}
                  >
                    <Image
                      src={`/images/views/${p}`}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 130px, (min-width: 768px) 12vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    {!isLast && (
                      <span className="absolute top-1.5 left-1.5 rounded-sm bg-black/65 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-mono font-bold text-white tracking-wider">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    )}
                    {isLast && (
                      <div className="absolute inset-0 bg-navy/85 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-0.5">
                        <Plus className="h-5 w-5 text-orange" strokeWidth={3} />
                        <span className="font-extrabold text-base md:text-lg leading-none">
                          {remaining}
                        </span>
                        <span className="text-[9px] font-mono tracking-[0.2em] opacity-75">
                          MORE
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-60 bg-black/95 flex flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between px-5 md:px-8 py-4 text-white">
            <span className="font-mono text-sm md:text-base tracking-wider">
              {String(openIndex + 1).padStart(2, '0')} / {PHOTOS.length}
            </span>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-3 md:px-16">
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 md:left-6 z-10 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            <div className="relative h-full w-full max-w-5xl">
              <Image
                key={openIndex}
                src={`/images/views/${PHOTOS[openIndex]}`}
                alt={`Photo ${openIndex + 1} of ${PHOTOS.length}`}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain animate-[fadeIn_.25s_ease-out]"
                priority
              />
            </div>

            <button
              type="button"
              onClick={next}
              className="absolute right-2 md:right-6 z-10 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>

          <div className="px-3 md:px-8 py-4 overflow-x-auto">
            <div className="flex gap-2 mx-auto w-max">
              {PHOTOS.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => open(i)}
                  className={`relative h-14 w-20 md:h-16 md:w-24 shrink-0 overflow-hidden rounded-md transition ${
                    i === openIndex
                      ? 'ring-2 ring-orange opacity-100'
                      : 'ring-1 ring-white/20 opacity-50 hover:opacity-100'
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === openIndex}
                >
                  <Image
                    src={`/images/views/${p}`}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

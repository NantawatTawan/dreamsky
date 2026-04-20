'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { quote: string; name: string; location: string };

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
const shifts = ['md:translate-y-4', 'md:-translate-y-2', 'md:translate-y-6'];
const backgrounds = [
  '/images/review_card/1.jpg',
  '/images/review_card/2.jpg',
  '/images/review_card/3.jpg',
];

export default function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Item[];

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl text-navy tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-dark/70 text-base md:text-lg">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {items.map((it, i) => (
            <ScrollReveal key={i} delay={i * 160} className={shifts[i % shifts.length]}>
              <article
                className={`group relative mx-auto w-full max-w-sm aspect-[4/5] overflow-hidden rounded-sm bg-white p-2 shadow-2xl ring-1 ring-navy/10 ${rotations[i % rotations.length]} transition duration-500 hover:rotate-0 hover:scale-[1.03]`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={backgrounds[i % backgrounds.length]}
                    alt={`Paramotor flight — ${it.location}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={i === 0}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-3 pointer-events-none rounded-sm border border-dashed border-white/30"
                  />

                  <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                    <span className="rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-mono font-bold text-navy tracking-[0.18em] shadow">
                      CNX · AIRMAIL
                    </span>
                    <span className="flex text-gold drop-shadow-lg" aria-label="5 stars">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <p className="text-white font-semibold text-base md:text-[17px] leading-relaxed drop-shadow-md">
                      &ldquo;{it.quote}&rdquo;
                    </p>

                    <div className="mt-4 pt-3 border-t border-dashed border-white/30">
                      <p className="font-bold text-white text-sm">— {it.name}</p>
                      <p className="text-xs text-white/75">{it.location}</p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

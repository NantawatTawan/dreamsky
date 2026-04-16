'use client';

import { useTranslations } from 'next-intl';
import { Plane, Star } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { quote: string; name: string; location: string };

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
const shifts = ['md:translate-y-4', 'md:-translate-y-2', 'md:translate-y-6'];

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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {items.map((it, i) => (
            <ScrollReveal key={i} delay={i * 160} className={shifts[i % shifts.length]}>
              <article
                className={`group relative mx-auto max-w-sm rounded-sm bg-white p-6 shadow-xl ring-1 ring-navy/10 ${rotations[i % rotations.length]} transition duration-500 hover:rotate-0 hover:scale-[1.03]`}
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 11px, rgba(27,58,92,0.04) 12px)',
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-2 pointer-events-none"
                  style={{
                    border: '2px dashed rgba(27,58,92,0.15)',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded bg-gradient-to-br from-sky-light to-gold ring-2 ring-white shadow flex items-center justify-center text-white">
                      <Plane className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded border-2 border-dashed border-orange/50 px-2 py-0.5 text-[9px] font-mono text-orange tracking-widest">
                        CNX · AIRMAIL
                      </span>
                      <span className="flex text-gold" aria-label="5 stars">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-navy font-semibold text-base md:text-lg leading-relaxed">
                    &ldquo;{it.quote}&rdquo;
                  </p>

                  <div className="mt-6 pt-4 border-t border-dashed border-navy/20">
                    <p className="font-bold text-navy text-sm">— {it.name}</p>
                    <p className="text-xs text-dark/60">{it.location}</p>
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

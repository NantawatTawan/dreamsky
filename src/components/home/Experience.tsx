'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as string[];

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
          <div className="relative aspect-4/5 md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/views/S__26935337_0.jpg"
              alt={t('image_caption')}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent"
            />
            <div className="absolute inset-0 flex items-end justify-start p-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur px-4 py-2 text-navy font-semibold text-sm ring-1 ring-white shadow-md">
                <Camera className="h-4 w-4" /> {t('image_caption')}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

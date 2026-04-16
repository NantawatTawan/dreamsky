'use client';

import { useTranslations } from 'next-intl';
import { Plane } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function PackagesHero() {
  const t = useTranslations('packages');
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-navy via-navy/90 to-light pt-28 pb-40 md:pt-36 md:pb-52">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 10%, rgba(245,183,49,0.25), transparent 40%), radial-gradient(ellipse at 80% 30%, rgba(232,135,43,0.2), transparent 40%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center text-white">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-[0.3em] font-semibold ring-1 ring-white/30 backdrop-blur">
            <Plane className="h-3.5 w-3.5" /> BOARDING PASS
          </span>
          <h1 className="mt-6 font-extrabold text-4xl md:text-6xl leading-tight tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg md:text-2xl text-white/85 leading-relaxed">
            {t('subtitle')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Video } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const LINE = 'https://line.me/ti/p/9cPa9GRwet';

export default function GoProAddOn() {
  const t = useTranslations('packages.gopro');

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-navy/90 p-6 md:p-8 ring-1 ring-white/10">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 50%, rgba(245,183,49,0.35), transparent 45%), radial-gradient(circle at 85% 50%, rgba(232,135,43,0.25), transparent 45%)',
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-orange shadow-lg">
                <Video className="h-8 w-8 text-navy" strokeWidth={2.25} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-gold ring-1 ring-gold/30">
                  {t('badge')}
                </div>
                <h3 className="mt-2 font-extrabold text-xl md:text-2xl text-white leading-tight">
                  {t('title')}
                </h3>
                <p className="mt-1.5 text-sm md:text-base text-white/75 leading-relaxed">
                  {t('description')}
                </p>
              </div>

              <a
                href={LINE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 font-bold text-white text-sm md:text-base whitespace-nowrap shadow-lg hover:bg-orange/90 hover:-translate-y-0.5 transition duration-300 md:self-center"
              >
                {t('cta')} →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

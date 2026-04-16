'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { label: string; description: string };

export default function Highlights() {
  const t = useTranslations('highlights');
  const items = t.raw('items') as Item[];

  return (
    <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(232,135,43,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(245,183,49,0.2), transparent 40%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-white/70 text-base md:text-lg">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it, i) => {
            const angle = -45 + (i + 1) * 36;
            return (
              <ScrollReveal key={i} delay={i * 140}>
                <div className="hover-float rounded-2xl bg-white/5 backdrop-blur p-6 ring-1 ring-white/10 hover:ring-orange/60 hover:bg-white/10">
                  <div className="relative mx-auto h-28 w-28 rounded-full ring-2 ring-white/20 flex items-center justify-center">
                    <span className="absolute inset-2 rounded-full ring-1 ring-white/10" />
                    <span
                      className="absolute left-1/2 top-1/2 origin-bottom h-11 w-[3px] rounded bg-orange"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                        boxShadow: '0 0 8px rgba(232,135,43,0.8)',
                      }}
                    />
                    <span className="h-3 w-3 rounded-full bg-orange ring-2 ring-navy" />
                    <span className="absolute -top-2 text-[10px] font-mono text-white/40">0</span>
                    <span className="absolute -bottom-2 text-[10px] font-mono text-white/40">MAX</span>
                  </div>
                  <h3 className="mt-5 text-center font-bold text-gold text-lg">{it.label}</h3>
                  <p className="mt-2 text-center text-white/70 text-sm leading-relaxed">
                    {it.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

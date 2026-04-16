'use client';

import { useTranslations } from 'next-intl';
import { Calendar, RefreshCcw, Clock, HeartPulse, CloudSun, Info } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const ICONS = [Calendar, RefreshCcw, Clock, HeartPulse, CloudSun] as const;

export default function PackagesConditions() {
  const t = useTranslations('packages');
  const items = t.raw('conditions_items') as string[];

  return (
    <section className="bg-light py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-bold tracking-widest text-navy">
            <Info className="h-3.5 w-3.5" /> INFO
          </div>
          <h2 className="mt-4 font-extrabold text-3xl md:text-5xl text-navy tracking-tight">
            {t('conditions_title')}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-navy/10 hover:border-orange/40 transition">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  {(() => {
                    const Icon = ICONS[i];
                    return Icon ? <Icon className="h-5 w-5" /> : <span>•</span>;
                  })()}
                </div>
                <p className="text-sm md:text-base text-dark/85 leading-relaxed pt-1">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

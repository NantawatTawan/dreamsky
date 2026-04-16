'use client';

import { useTranslations } from 'next-intl';
import { Video, Shield, ShieldCheck, ClipboardList, User, Check } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const ICONS = [Video, Shield, ShieldCheck, ClipboardList, User] as const;

export default function PricingIncludes() {
  const t = useTranslations('pricing');
  const items = t.raw('includes_items') as string[];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="text-center font-extrabold text-3xl md:text-5xl text-navy tracking-tight">
            {t('includes_title')}
          </h2>
          <p className="mt-3 text-center text-dark/60 text-base md:text-lg">
            {t('includes_subtitle')}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-light hover:bg-sky-light/20 transition duration-300 hover-float">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md text-orange">
                  {(() => {
                    const Icon = ICONS[i];
                    return Icon ? <Icon className="h-7 w-7" /> : <Check className="h-7 w-7" />;
                  })()}
                </div>
                <p className="mt-4 text-sm md:text-base font-semibold text-navy leading-snug">
                  {item}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

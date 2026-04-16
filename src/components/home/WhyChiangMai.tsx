'use client';

import { useTranslations } from 'next-intl';
import { Mountain, Wheat, Sunrise, Cloud, Compass, MoveUp } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { icon: string; altitude: string; title: string; description: string };

const offsets = ['md:mt-0', 'md:mt-12', 'md:mt-4', 'md:mt-16', 'md:mt-8'];

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  '🏔️': Mountain,
  '🌾': Wheat,
  '🌅': Sunrise,
  '☁️': Cloud,
  '🧭': Compass,
};

export default function WhyChiangMai() {
  const t = useTranslations('why');
  const items = t.raw('items') as Item[];

  return (
    <section
      id="why"
      className="relative py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #e6f2fa 100%)' }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl text-navy leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-dark/70 text-base md:text-lg">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => {
            const Icon = iconMap[it.icon] ?? Mountain;
            return (
            <ScrollReveal
              key={i}
              delay={i * 150}
              direction={i % 2 === 0 ? 'up' : 'right'}
              className={offsets[i % offsets.length]}
            >
              <article className="hover-float rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm ring-1 ring-navy/5 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange ring-1 ring-orange/25">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-navy/5 text-navy text-xs font-semibold px-3 py-1 ring-1 ring-navy/10">
                    <MoveUp className="h-3 w-3" /> {it.altitude}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-xl text-navy">{it.title}</h3>
                <p className="mt-2 text-dark/70 text-sm md:text-base leading-relaxed">
                  {it.description}
                </p>
              </article>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

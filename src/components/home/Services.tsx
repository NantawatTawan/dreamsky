'use client';

import { useTranslations } from 'next-intl';
import { Users, GraduationCap, Camera, Gift } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { icon: string; name: string; description: string; badge: string };

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  '🪂': Users,
  '🎓': GraduationCap,
  '📷': Camera,
  '🎁': Gift,
};

export default function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as Item[];

  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl text-navy tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-dark/70 text-base md:text-lg">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((it, i) => {
            const Icon = iconMap[it.icon] ?? Users;
            return (
            <ScrollReveal key={i} delay={i * 120}>
              <article
                className="group relative rounded-2xl bg-light p-6 md:p-7 ring-2 ring-dashed ring-navy/20 transition duration-500 hover:ring-orange hover:shadow-2xl hover:shadow-orange/10 hover:rotate-[0.8deg] hover:-translate-y-2"
                style={{ borderStyle: 'dashed' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-orange/10 text-orange ring-1 ring-orange/30">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-navy text-white text-[10px] md:text-xs font-bold tracking-widest px-3 py-1">
                    {it.badge}
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-xl md:text-2xl text-navy">{it.name}</h3>
                <p className="mt-2 text-dark/70 leading-relaxed">{it.description}</p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-white ring-2 ring-navy/20 -ml-8" />
                  <div className="perforated-edge flex-1 text-navy/30" />
                  <span className="h-3 w-3 rounded-full bg-white ring-2 ring-navy/20 -mr-8" />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-mono text-navy/50 tracking-widest">
                    GATE · CNX {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-orange font-semibold text-sm group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </article>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

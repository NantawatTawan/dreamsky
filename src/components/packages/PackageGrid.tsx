'use client';

import { useTranslations } from 'next-intl';
import { Plane, GraduationCap, Gift } from 'lucide-react';
import PackageCard from './PackageCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

const LINE = 'https://line.me/ti/p/9cPa9GRwet';

const PACKAGES = [
  {
    key: 'tandem',
    icon: <Plane className="h-6 w-6 text-navy" />,
    image: '/images/views/S__26935320_0.jpg',
    features: ['duration_tandem', 'pro_pilot', 'beginner_friendly', 'safety'],
    popular: true,
  },
  {
    key: 'course',
    icon: <GraduationCap className="h-6 w-6 text-navy" />,
    image: '/images/views/S__26935335_0.jpg',
    features: ['from_basics', 'solo_flight', 'certified_instructor', 'flexible_schedule'],
    popular: false,
  },
  {
    key: 'surprise',
    icon: <Gift className="h-6 w-6 text-orange" />,
    image: '/images/views/S__26935348_0.jpg',
    features: ['gift_wrapped', 'proposal_ready', 'custom_moment', 'photo_video'],
    popular: false,
  },
] as const;

export default function PackageGrid() {
  const t = useTranslations('packages');

  return (
    <section className="relative -mt-28 md:-mt-36 pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 md:gap-6 md:grid-cols-3 md:items-start">
          {PACKAGES.map((p, i) => (
            <ScrollReveal key={p.key} delay={i * 120}>
              <PackageCard
                name={t(`packages.${p.key}.name`)}
                description={t(`packages.${p.key}.desc`)}
                features={p.features.map((f) => t(`features.${f}`))}
                image={p.image}
                imageAlt={t(`packages.${p.key}.name`)}
                icon={p.icon}
                popular={p.popular}
                popularLabel={t('popular_label')}
                ctaText={t('inquire')}
                ctaLink={LINE}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

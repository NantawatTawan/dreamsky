'use client';

import { useTranslations } from 'next-intl';
import { Mountain, Sunrise, Heart } from 'lucide-react';
import PricingCard from './PricingCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

const LINE = 'https://line.me/R/ti/p/@dreamskyparamotor';

export default function PricingGrid() {
  const t = useTranslations('pricing');

  const packages = [
    {
      key: 'trial',
      icon: <Mountain className="h-8 w-8 text-navy" />,
      price: 'XXXX',
      unit: t('per_person'),
      features: [
        t('features.duration_trial'),
        t('features.gopro'),
        t('features.safety'),
        t('features.insurance'),
      ],
      popular: false,
    },
    {
      key: 'sunrise',
      icon: <Sunrise className="h-8 w-8 text-orange" />,
      price: 'XXXX',
      unit: t('per_person'),
      features: [
        t('features.sunrise_view'),
        t('features.gopro'),
        t('features.safety'),
        t('features.insurance'),
        t('features.transfer'),
      ],
      popular: true,
    },
    {
      key: 'couple',
      icon: <Heart className="h-8 w-8 text-orange fill-orange" />,
      price: 'XXXX',
      unit: t('per_couple'),
      features: [
        t('features.two_people'),
        t('features.gopro'),
        t('features.safety'),
        t('features.insurance'),
        t('features.transfer'),
      ],
      popular: false,
    },
  ] as const;

  return (
    <section className="relative -mt-28 md:-mt-36 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 md:gap-6 md:grid-cols-3 md:items-start">
          {packages.map((p, i) => (
            <ScrollReveal key={p.key} delay={i * 120}>
              <PricingCard
                name={t(`packages.${p.key}.name`)}
                description={t(`packages.${p.key}.desc`)}
                price={p.price}
                unit={p.unit}
                icon={p.icon}
                features={[...p.features]}
                popular={p.popular}
                popularLabel={t('first_class')}
                ctaText={t('book_now')}
                ctaLink={LINE}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

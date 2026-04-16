'use client';

import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { LineIcon } from '@/components/icons/BrandIcons';

export default function PackagesCTA() {
  const t = useTranslations('packages');
  const tc = useTranslations('cta');

  // TODO: add WhatsApp when customer provides number
  const ctas = [
    { label: tc('book'), href: 'https://line.me/ti/p/9cPa9GRwet', Icon: LineIcon },
    { label: tc('call'), href: 'tel:+66823138099', Icon: Phone },
  ];

  return (
    <section className="relative bg-sunset py-20 md:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2), transparent 35%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center text-white">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl leading-tight tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="mt-4 text-base md:text-xl text-white/85">
            {t('cta_subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {ctas.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-6 py-3 font-bold text-white ring-2 ring-white/40 hover:bg-white hover:text-navy transition duration-300 hover:-translate-y-1"
              >
                <c.Icon className="h-5 w-5" />
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

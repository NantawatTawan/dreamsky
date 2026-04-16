'use client';

import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { LineIcon } from '@/components/icons/BrandIcons';

export default function CTASection() {
  const t = useTranslations('cta');

  // TODO: add WhatsApp when customer provides number
  const ctas = [
    { label: t('book'), href: 'https://line.me/ti/p/9cPa9GRwet', Icon: LineIcon, primary: true },
    { label: t('call'), href: 'tel:+66823138099', Icon: Phone, primary: false },
  ];

  return (
    <section className="relative bg-sunset py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 80%, rgba(255,255,255,0.15), transparent 30%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.15), transparent 30%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center text-white">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-6xl leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg md:text-2xl text-white/90 leading-relaxed">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            {ctas.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`group inline-flex flex-col items-center justify-center gap-1 rounded-full font-bold text-base transition duration-300 hover:-translate-y-2 ${
                  c.primary
                    ? 'h-28 w-28 md:h-32 md:w-32 bg-white text-navy shadow-2xl animate-pulse-glow'
                    : 'h-24 w-24 md:h-28 md:w-28 bg-white/15 backdrop-blur text-white ring-2 ring-white/40 hover:bg-white/25'
                }`}
              >
                <c.Icon className="h-7 w-7 md:h-8 md:w-8" />
                <span className="text-xs md:text-sm">{c.label}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div aria-hidden className="mt-16 flex justify-center gap-2 opacity-70">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-8 rounded-full bg-gold"
              style={{
                animation: `pulseGlow 2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

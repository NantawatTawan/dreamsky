'use client';

import type { ReactNode } from 'react';
import { Check, Star } from 'lucide-react';

export interface PricingCardProps {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  icon?: ReactNode;
  popular?: boolean;
  popularLabel?: string;
  ctaText: string;
  ctaLink: string;
}

export default function PricingCard({
  name,
  price,
  unit,
  description,
  features,
  icon,
  popular = false,
  popularLabel = 'FIRST CLASS',
  ctaText,
  ctaLink,
}: PricingCardProps) {
  return (
    <div
      className={[
        'group relative flex flex-col bg-white rounded-3xl transition duration-500 hover-float',
        'border-l-2 border-r-2 border-dashed',
        popular
          ? 'border-gold shadow-[0_20px_60px_-20px_rgba(245,183,49,0.55)] md:-translate-y-3 md:scale-[1.04] z-10 ring-2 ring-gold/60'
          : 'border-navy/20 shadow-xl hover:shadow-2xl',
      ].join(' ')}
    >
      {popular && (
        <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-shimmer opacity-60" />
        </div>
      )}

      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold via-orange to-gold px-5 py-1.5 text-xs font-extrabold tracking-[0.2em] text-navy shadow-lg ring-2 ring-white">
            <Star className="h-3 w-3 fill-current" /> {popularLabel} <Star className="h-3 w-3 fill-current" />
          </span>
        </div>
      )}

      <div className="relative p-8 md:p-10 pt-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-3xl">
            {icon}
          </div>
          <div className="text-right">
            <div className={`font-extrabold leading-none ${popular ? 'text-5xl md:text-6xl text-orange' : 'text-4xl md:text-5xl text-navy'}`}>
              {price}
            </div>
            <div className="mt-1 text-xs md:text-sm text-navy/60 font-semibold">{unit}</div>
          </div>
        </div>

        <h3 className="mt-6 text-2xl md:text-3xl font-extrabold text-navy">{name}</h3>
        <p className="mt-2 text-sm md:text-base text-dark/70 leading-relaxed">{description}</p>
      </div>

      <div aria-hidden className="relative px-6">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-light -ml-8 shadow-inner" />
          <div className="flex-1 border-t-2 border-dashed border-navy/25" />
          <div className="h-4 w-4 rounded-full bg-light -mr-8 shadow-inner" />
        </div>
      </div>

      <div className="flex-1 p-8 md:p-10 pt-6">
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-dark/85">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={ctaLink}
          target={ctaLink.startsWith('http') ? '_blank' : undefined}
          rel={ctaLink.startsWith('http') ? 'noreferrer' : undefined}
          className={[
            'mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-bold text-base transition duration-300',
            popular
              ? 'bg-orange text-white shadow-lg hover:bg-orange/90 hover:shadow-xl animate-pulse-glow'
              : 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
          ].join(' ')}
        >
          {ctaText} →
        </a>
      </div>
    </div>
  );
}

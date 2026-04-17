'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Check, Star } from 'lucide-react';

export interface PackageCardProps {
  name: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  icon?: ReactNode;
  popular?: boolean;
  popularLabel?: string;
  ctaText: string;
  ctaLink: string;
}

export default function PackageCard({
  name,
  description,
  features,
  image,
  imageAlt,
  icon,
  popular = false,
  popularLabel = 'POPULAR',
  ctaText,
  ctaLink,
}: PackageCardProps) {
  return (
    <div
      className={[
        'group relative flex flex-col bg-white rounded-3xl overflow-hidden transition duration-500 hover-float',
        popular
          ? 'shadow-[0_20px_60px_-20px_rgba(245,183,49,0.55)] md:-translate-y-3 md:scale-[1.04] z-10 ring-2 ring-gold/60'
          : 'shadow-xl hover:shadow-2xl ring-1 ring-navy/10',
      ].join(' ')}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent" />

        {popular && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-gold via-orange to-gold px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-navy shadow-lg ring-2 ring-white">
              <Star className="h-3 w-3 fill-current" /> {popularLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-7 md:p-8">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy/5">
              {icon}
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-extrabold text-navy leading-tight">
            {name}
          </h3>
        </div>

        <p className="mt-3 text-sm md:text-base text-dark/70 leading-relaxed">
          {description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-dark/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
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
            'mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-bold text-base transition duration-300',
            popular
              ? 'bg-orange text-white shadow-lg hover:bg-orange/90 hover:shadow-xl'
              : 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
          ].join(' ')}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}

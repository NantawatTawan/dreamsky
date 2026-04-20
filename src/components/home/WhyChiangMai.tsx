'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MoveUp } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { icon: string; altitude: string; title: string; description: string };

const offsets = ['md:mt-0', 'md:mt-12', 'md:mt-4', 'md:mt-16', 'md:mt-8'];

const imageMap: Record<string, string> = {
  '🏔️': '/images/LayeredMountains.png',
  '🌾': '/images/GreenRiceFields.png',
  '🌅': '/images/SunriseSunset.png',
  '☁️': '/images/SeasonalSeaofMist.png',
  '🧭': '/images/360OpenView.png',
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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {items.map((it, i) => (
            <ScrollReveal
              key={i}
              delay={i * 150}
              direction={i % 2 === 0 ? 'up' : 'right'}
              className={`md:col-span-2${i === 3 ? ' md:col-start-2' : ''} ${offsets[i % offsets.length]}`}
            >
              <article className="hover-float overflow-hidden rounded-2xl bg-white/90 backdrop-blur shadow-sm ring-1 ring-navy/5 hover:shadow-xl transition">
                <div className="relative h-40 w-full overflow-hidden bg-sky-light/30">
                  {imageMap[it.icon] && (
                    <Image
                      src={imageMap[it.icon]}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur text-navy text-xs font-semibold px-3 py-1 ring-1 ring-white/60 shadow-sm">
                    <MoveUp className="h-3 w-3" /> {it.altitude}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/60 to-transparent"
                  />
                </div>
                <div className="px-6 pt-5 pb-6">
                  <h3 className="font-bold text-xl text-navy">{it.title}</h3>
                  <p className="mt-2 text-dark/70 text-sm md:text-base leading-relaxed">
                    {it.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

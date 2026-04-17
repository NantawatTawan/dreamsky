'use client';

import { useTranslations } from 'next-intl';

const CLIPS = [
  { src: '/vdo/798030719.561101.mp4', labelKey: 'clip_1' },
  { src: '/vdo/798030720.667845.mp4', labelKey: 'clip_2' },
] as const;

export default function VideoReels() {
  const t = useTranslations('videos');

  return (
    <section className="relative py-20 md:py-28 bg-navy">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {CLIPS.map((c) => (
            <div
              key={c.src}
              className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
            >
              <video
                src={c.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t(c.labelKey)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

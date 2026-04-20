'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, X } from 'lucide-react';

const CLIPS = [
  { src: '/vdo/5.mp4', labelKey: 'clip_1' },
  { src: '/vdo/3.mp4', labelKey: 'clip_2' },
  { src: '/vdo/4.mp4', labelKey: 'clip_3' },
  { src: '/vdo/798030719.561101.mp4', labelKey: 'clip_4' },
  { src: '/vdo/798030720.667845.mp4', labelKey: 'clip_5' },
] as const;

const DESKTOP_OFFSETS = [
  'lg:translate-y-4',
  'lg:-translate-y-2',
  'lg:translate-y-6',
  'lg:-translate-y-2',
  'lg:translate-y-4',
];

export default function VideoReels() {
  const t = useTranslations('videos');
  const scrollerRef = useRef<HTMLUListElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = scroller.querySelectorAll<HTMLLIElement>('li[data-card]');
    const target = cards[index];
    if (!target) return;
    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const left = Math.max(0, Math.min(maxScroll, targetCenter - scroller.clientWidth / 2));
    scroller.scrollTo({ left, behavior: 'smooth' });
  }, []);

  const handleCardClick = (index: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      setOpenIndex(index);
    } else {
      scrollToIndex(index);
    }
  };

  const closeModal = useCallback(() => setOpenIndex(null), []);
  const prevModal = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + CLIPS.length) % CLIPS.length)),
    [],
  );
  const nextModal = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % CLIPS.length)),
    [],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const videos = Array.from(scroller.querySelectorAll('video'));
    const videoIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 },
    );
    videos.forEach((v) => videoIO.observe(v));

    const cards = Array.from(scroller.querySelectorAll<HTMLLIElement>('li[data-card]'));
    const mql = window.matchMedia('(min-width: 1024px)');
    let raf = 0;

    const updateActive = () => {
      if (mql.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (scroller.scrollLeft <= 1) return setActiveIndex(0);
        if (scroller.scrollLeft >= maxScroll - 1) return setActiveIndex(cards.length - 1);
        const centerX = scroller.scrollLeft + scroller.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const dist = Math.abs(cardCenter - centerX);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });
        setActiveIndex(closestIdx);
      });
    };

    updateActive();
    scroller.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      cancelAnimationFrame(raf);
      videoIO.disconnect();
      scroller.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const videos = Array.from(scroller.querySelectorAll('video'));
    const mql = window.matchMedia('(min-width: 1024px)');
    const syncMute = () => {
      const isLg = mql.matches;
      videos.forEach((v, i) => {
        v.muted = isLg || openIndex !== null ? true : i !== activeIndex || muted;
      });
    };
    syncMute();
    mql.addEventListener('change', syncMute);
    return () => mql.removeEventListener('change', syncMute);
  }, [activeIndex, muted, openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') prevModal();
      else if (e.key === 'ArrowRight') nextModal();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, closeModal, prevModal, nextModal]);

  useEffect(() => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [openIndex, muted]);

  return (
    <section className="relative py-20 md:py-28 bg-navy overflow-hidden isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(1px_1px_at_15%_25%,white,transparent),radial-gradient(1px_1px_at_78%_18%,white,transparent),radial-gradient(1px_1px_at_42%_72%,white,transparent),radial-gradient(1px_1px_at_88%_60%,white,transparent),radial-gradient(1px_1px_at_28%_88%,white,transparent),radial-gradient(1px_1px_at_62%_42%,white,transparent)]"
      />
      <svg
        aria-hidden
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-6 h-24 md:h-32 w-full opacity-20"
      >
        <path
          d="M -20 120 Q 200 40 420 110 T 820 90 T 1220 60"
          stroke="url(#trailGrad)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 10"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8872B" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5B731" stopOpacity="1" />
            <stop offset="100%" stopColor="#E8872B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-orange ring-1 ring-orange/30 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            {t('badge')}
          </span>
          <h2 className="mt-5 font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">{t('subtitle')}</p>
        </div>

        <div className="relative mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="lg:hidden absolute top-1 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur text-white hover:bg-black/80 transition ring-1 ring-white/25 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

        <ul
          ref={scrollerRef}
          className="relative flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-4 pb-4 -mx-5 md:-mx-8 px-5 md:px-8 lg:mx-0 lg:px-0 lg:pt-8 lg:pb-8 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CLIPS.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <li
                key={c.src}
                data-card
                className={`snap-center shrink-0 w-[74vw] sm:w-[48vw] md:w-[36vw] lg:shrink lg:w-auto ${DESKTOP_OFFSETS[i]}`}
              >
                <button
                  type="button"
                  onClick={() => handleCardClick(i)}
                  aria-label={t(c.labelKey)}
                  className="block w-full lg:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-3xl"
                >
                  <div
                    className={`group relative aspect-9/16 overflow-hidden rounded-3xl bg-black transition-all duration-500 will-change-transform shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10 ${
                      isActive
                        ? 'scale-[1.02] opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-white/20'
                        : 'scale-[0.92] opacity-70'
                    } lg:scale-100! lg:opacity-100! lg:ring-white/15 lg:hover:ring-white/40 lg:hover:-translate-y-2`}
                  >
                    <video
                      src={c.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={t(c.labelKey)}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10 pointer-events-none"
                    />
                    <div
                      aria-hidden
                      className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 bg-black/30"
                    >
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
          {CLIPS.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to reel ${i + 1}`}
              aria-current={i === activeIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-orange' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-white/50 text-xs lg:hidden">
          {t('swipe_hint')}
        </p>
      </div>

      {openIndex !== null && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(CLIPS[openIndex].labelKey)}
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex flex-col animate-[fadeIn_.2s_ease-out]"
          onClick={closeModal}
        >
          <div
            className="shrink-0 flex items-center justify-between gap-3 px-5 md:px-8 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white pl-3 pr-5 py-2.5 font-semibold text-sm md:text-base transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t('back')}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('back')}</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy hover:bg-orange hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center gap-3 md:gap-6 px-3 md:px-8 pb-8">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevModal();
              }}
              className="shrink-0 z-10 inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            <video
              key={openIndex}
              ref={modalVideoRef}
              src={CLIPS[openIndex].src}
              autoPlay
              loop
              playsInline
              onClick={(e) => {
                e.stopPropagation();
                const v = e.currentTarget;
                if (v.paused) v.play().catch(() => {});
                else v.pause();
              }}
              className="max-h-full aspect-9/16 max-w-full object-contain rounded-2xl bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] animate-[driftInUp_.4s_ease-out] cursor-pointer"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextModal();
              }}
              className="shrink-0 z-10 inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next video"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}

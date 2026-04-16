'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/shared/ScrollReveal';

type Item = { number: string; title: string; description: string };

const waypoints = [
  { x: 80, y: 180 },
  { x: 340, y: 80 },
  { x: 600, y: 220 },
  { x: 880, y: 100 },
  { x: 1120, y: 200 },
];

export default function Steps() {
  const t = useTranslations('steps');
  const items = t.raw('items') as Item[];
  const pathRef = useRef<SVGPathElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = `M ${waypoints[0].x} ${waypoints[0].y} ` +
    waypoints.slice(1).map((p, i) => {
      const prev = waypoints[i];
      const cx1 = prev.x + 120;
      const cx2 = p.x - 120;
      return `C ${cx1} ${prev.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
    }).join(' ');

  return (
    <section id="steps" className="relative py-20 md:py-28 bg-light overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-extrabold text-3xl md:text-5xl text-navy tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-dark/70 text-base md:text-lg">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Desktop curved path */}
        <div className="hidden md:block relative mt-20">
          <svg
            viewBox="0 0 1200 300"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d={d}
              fill="none"
              stroke="#E8872B"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className={`path-draw ${drawn ? 'is-visible' : ''}`}
            />
            {waypoints.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="24" fill="#E8872B" />
                <circle cx={p.x} cy={p.y} r="24" fill="none" stroke="#F5B731" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" from="24" to="38" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontWeight="700" fontSize="14">
                  {items[i]?.number}
                </text>
              </g>
            ))}
            <circle
              cx={waypoints[waypoints.length - 1].x + 42}
              cy={waypoints[waypoints.length - 1].y}
              r="6"
              fill="#F5B731"
            />
          </svg>

          <div className="mt-6 grid grid-cols-5 gap-4">
            {items.map((it, i) => (
              <ScrollReveal key={i} delay={i * 120} className="text-center">
                <h3 className="font-bold text-navy text-base">{it.title}</h3>
                <p className="mt-1 text-xs text-dark/65 leading-relaxed">{it.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden mt-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-orange" />
          <ul className="space-y-8">
            {items.map((it, i) => (
              <ScrollReveal as="li" key={i} delay={i * 100} className="relative pl-16">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white font-bold ring-4 ring-light">
                  {it.number}
                </span>
                <h3 className="font-bold text-navy text-lg">{it.title}</h3>
                <p className="mt-1 text-sm text-dark/70 leading-relaxed">{it.description}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

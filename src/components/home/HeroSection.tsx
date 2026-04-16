"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Plane } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSteps = () => {
    document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" });
  };

  const lines = [t("tagline_line1"), t("tagline_line2"), t("tagline_line3")];

  return (
    <section className="relative min-h-[88vh] md:min-h-screen overflow-hidden flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${offset * 0.35}px, 0)` }}
      >
        <Image
          src="/images/views/S__26935304_0.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/50 via-navy/40 to-navy/80"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          transform: `translate3d(0, ${offset * 0.15}px, 0)`,
          background:
            "radial-gradient(60% 40% at 80% 30%, rgba(245,183,49,0.35), transparent), radial-gradient(40% 30% at 15% 70%, rgba(135,206,235,0.25), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl w-full px-5 md:px-8 py-20 md:py-28">
        <span
          className="inline-block rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs md:text-sm font-semibold text-white/90 ring-1 ring-white/20 animate-drift-in-up"
          style={{ animationDelay: "0ms" }}
        >
          <Plane className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" />{" "}
          {t("note")}
        </span>

        <h1 className="mt-6 font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-7xl">
          {lines.map((line, i) => (
            <span
              key={i}
              className="block animate-drift-in-up opacity-0"
              style={{
                animationDelay: `${200 + i * 300}ms`,
                animationFillMode: "forwards",
              }}
            >
              {i === 1 ? (
                <span className="bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent">
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <p
          className="mt-6 max-w-2xl text-base md:text-xl text-white/80 leading-relaxed animate-drift-in-up opacity-0"
          style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
        >
          {t("subtitle")}
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-drift-in-up opacity-0"
          style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
        >
          <a
            href="https://line.me/ti/p/9cPa9GRwet"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange/30 hover:-translate-y-1 hover:shadow-orange/50 transition"
          >
            {t("cta_book")}
          </a>
          <button
            type="button"
            onClick={scrollToSteps}
            className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-navy hover:-translate-y-1 transition"
          >
            {t("cta_try")}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToSteps}
        aria-label={t("scroll_hint")}
        className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white animate-bounce-down cursor-pointer"
      >
        <span className="text-xs md:text-sm font-medium">
          {t("scroll_hint")}
        </span>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <path
            d="M10 2v22M2 18l8 8 8-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}

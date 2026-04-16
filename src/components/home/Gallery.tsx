"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  "S__26935317_0.jpg",
  "S__26935321_0.jpg",
  "S__26935326_0.jpg",
  "S__26935334_0.jpg",
  "S__26935340_0.jpg",
  "S__26935345_0.jpg",
  "S__26935350_0.jpg",
  "S__26935353_0.jpg",
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const open = useCallback((i: number) => setActive(i), []);
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length,
      ),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, prev, next]);

  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-extrabold text-3xl md:text-5xl text-navy leading-tight tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-dark/70 text-base md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {PHOTOS.map((file, i) => (
            <li key={file}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full aspect-square overflow-hidden rounded-xl bg-sky-light/20 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                aria-label={t("open_photo", { n: i + 1 })}
              >
                <Image
                  src={`/images/views/${file}`}
                  alt={t("photo_alt", { n: i + 1 })}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="backdrop:bg-black/80 bg-transparent p-0 m-0 w-screen h-screen max-w-none max-h-none"
      >
        {active !== null && (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="relative w-[92vw] h-[78vh] max-w-5xl">
              <Image
                src={`/images/views/${PHOTOS[active]}`}
                alt={t("photo_alt", { n: active + 1 })}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy hover:bg-white transition"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label={t("previous")}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-navy hover:bg-white transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t("next")}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-navy hover:bg-white transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}

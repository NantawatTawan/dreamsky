'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'packages', href: '/packages' },
  { key: 'blog', href: '/blog' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative h-10 w-10">
            <Image src="/images/logo-02.png" alt="Dream Sky Paramotor CNX" fill sizes="40px" className="object-contain" />
          </span>
          <span className="font-bold text-navy text-base md:text-lg leading-tight">
            Dream Sky <span className="text-orange">Paramotor</span> CNX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-orange'
                  : 'text-dark/80 hover:text-orange'
              }`}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />
          <a
            href="https://line.me/ti/p/9cPa9GRwet"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange/90 hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            {t('book_now')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-navy/5 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-full bg-current transition-transform ${
                open ? 'translate-y-1.75 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.75 block h-0.5 w-full bg-current transition-opacity ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-0.5 w-full bg-current transition-transform ${
                open ? '-translate-y-1.75 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-navy/5 bg-white/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-base font-medium ${
                  isActive(item.href) ? 'text-orange' : 'text-dark/80'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-2 border-t border-navy/5">
            <LanguageSwitcher />
            <a
              href="https://line.me/ti/p/9cPa9GRwet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              {t('book_now')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

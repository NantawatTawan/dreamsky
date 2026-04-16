import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Prompt, Noto_Sans_SC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-prompt',
  display: 'swap',
});
const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sc',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dreamsky-paramotor.com';

const OG_LOCALE: Record<string, string> = {
  th: 'th_TH',
  en: 'en_US',
  zh: 'zh_CN',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | Dream Sky Paramotor CNX',
    },
    description: t('description'),
    keywords: ['paramotor', 'chiang mai', 'พารามอเตอร์', 'เชียงใหม่', '清迈滑翔伞'],
    authors: [{ name: 'Dream Sky Paramotor CNX' }],
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'en_US',
      siteName: 'Dream Sky Paramotor CNX',
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Dream Sky Paramotor CNX' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        th: `${SITE_URL}/th`,
        en: `${SITE_URL}/en`,
        zh: `${SITE_URL}/zh`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Dream Sky Paramotor CNX',
    description: 'Paramotor flying experience in Chiang Mai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chiang Mai',
      addressCountry: 'TH',
    },
    openingHours: ['Mo-Su 06:30-09:00', 'Mo-Su 16:00-17:30'],
    priceRange: '$$',
    image: `${SITE_URL}/images/og-image.jpg`,
    url: `${SITE_URL}/${locale}`,
  };

  return (
    <html lang={locale} className={`${inter.variable} ${prompt.variable} ${notoSC.variable}`}>
      <body className="font-sans-th flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Prompt, Noto_Sans_SC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import Analytics from '@/components/analytics/Analytics';
import { SITE_URL, SITE_NAME, OG_LOCALE } from '@/lib/site';
import { organizationLd, websiteLd, localBusinessLd } from '@/lib/jsonld';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const keywords = t.raw('keywords') as string[] | undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    keywords: keywords ?? [],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    category: 'travel',
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: '/icon.jpg',
      apple: '/apple-icon.jpg',
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'en_US',
      alternateLocale: Object.values(OG_LOCALE).filter((v) => v !== OG_LOCALE[locale]),
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      images: [
        { url: '/images/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME },
      ],
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
        'x-default': `${SITE_URL}/th`,
        th: `${SITE_URL}/th`,
        en: `${SITE_URL}/en`,
        zh: `${SITE_URL}/zh`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BAIDU_VERIFICATION
        ? { 'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION }
        : undefined,
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

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const description = t('description');

  const graph = [
    organizationLd(),
    websiteLd(locale),
    localBusinessLd(description, locale),
  ];

  return (
    <html lang={locale} className={`${inter.variable} ${prompt.variable} ${notoSC.variable}`}>
      <body className="font-sans-th flex flex-col min-h-screen">
        <JsonLd data={graph} />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

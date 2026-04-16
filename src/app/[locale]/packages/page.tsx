import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackagesHero from '@/components/packages/PackagesHero';
import PackageGrid from '@/components/packages/PackageGrid';
import GoProAddOn from '@/components/packages/GoProAddOn';
import PackagesIncludes from '@/components/packages/PackagesIncludes';
import PackagesConditions from '@/components/packages/PackagesConditions';
import PackagesCTA from '@/components/packages/PackagesCTA';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbLd, serviceLd, itemListLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const url = `${SITE_URL}/${locale}/packages`;
  return {
    title: t('packages_title'),
    description: t('packages_description'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/packages`]),
      ),
    },
    openGraph: {
      title: t('packages_title'),
      description: t('packages_description'),
      url,
    },
  };
}

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'packages' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const pageUrl = `${SITE_URL}/${locale}/packages`;

  const services = (['tandem', 'course', 'surprise'] as const).map((key) => ({
    key,
    name: t(`packages.${key}.name`),
    desc: t(`packages.${key}.desc`),
  }));

  const graph = [
    breadcrumbLd([
      { name: tNav('home'), url: `${SITE_URL}/${locale}` },
      { name: tNav('packages'), url: pageUrl },
    ]),
    itemListLd(
      t('title'),
      services.map((s) => ({ name: s.name, url: `${pageUrl}#${s.key}` })),
    ),
    ...services.map((s) =>
      serviceLd({
        name: s.name,
        description: s.desc,
        url: `${pageUrl}#${s.key}`,
      }),
    ),
  ];

  return (
    <main>
      <JsonLd data={graph} />
      <PackagesHero />
      <PackageGrid />
      <GoProAddOn />
      <PackagesIncludes />
      <PackagesConditions />
      <PackagesCTA />
    </main>
  );
}

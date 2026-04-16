import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackagesHero from '@/components/packages/PackagesHero';
import PackageGrid from '@/components/packages/PackageGrid';
import GoProAddOn from '@/components/packages/GoProAddOn';
import PackagesIncludes from '@/components/packages/PackagesIncludes';
import PackagesConditions from '@/components/packages/PackagesConditions';
import PackagesCTA from '@/components/packages/PackagesCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('packages_title'),
    description: t('packages_description'),
    openGraph: { title: t('packages_title'), description: t('packages_description') },
  };
}

export default function PackagesPage() {
  return (
    <main>
      <PackagesHero />
      <PackageGrid />
      <GoProAddOn />
      <PackagesIncludes />
      <PackagesConditions />
      <PackagesCTA />
    </main>
  );
}

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PricingHero from '@/components/pricing/PricingHero';
import PricingGrid from '@/components/pricing/PricingGrid';
import PricingIncludes from '@/components/pricing/PricingIncludes';
import PricingConditions from '@/components/pricing/PricingConditions';
import PricingCTA from '@/components/pricing/PricingCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('pricing_title'),
    description: t('pricing_description'),
    openGraph: { title: t('pricing_title'), description: t('pricing_description') },
  };
}

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PricingGrid />
      <PricingIncludes />
      <PricingConditions />
      <PricingCTA />
    </main>
  );
}

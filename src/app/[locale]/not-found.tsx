import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-xl">
        <p className="text-sm font-semibold tracking-widest text-orange">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-navy">
          {t('title')}
        </h1>
        <p className="mt-4 text-dark/70 leading-relaxed">{t('description')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange/90 transition"
        >
          {t('back')}
        </Link>
      </div>
    </section>
  );
}

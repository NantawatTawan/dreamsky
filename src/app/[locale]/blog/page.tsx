import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbLd, itemListLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const url = `${SITE_URL}/${locale}/blog`;
  return {
    title: t('blog_title'),
    description: t('blog_description'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/blog`]),
      ),
    },
    openGraph: {
      title: t('blog_title'),
      description: t('blog_description'),
      url,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const posts = getAllPosts(locale);
  const blogUrl = `${SITE_URL}/${locale}/blog`;

  const graph = [
    breadcrumbLd([
      { name: tNav('home'), url: `${SITE_URL}/${locale}` },
      { name: tNav('blog'), url: blogUrl },
    ]),
    itemListLd(
      t('title'),
      posts.map((p) => ({ name: p.title, url: `${blogUrl}/${p.slug}` })),
    ),
  ];

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <JsonLd data={graph} />
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">{t('title')}</h1>
        <p className="mt-3 text-dark/70">{t('subtitle')}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-dark/60 py-16">{t('no_posts')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}

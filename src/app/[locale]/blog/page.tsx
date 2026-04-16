import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('blog_title'),
    description: t('blog_description'),
    openGraph: { title: t('blog_title'), description: t('blog_description') },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const posts = getAllPosts(locale);

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
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

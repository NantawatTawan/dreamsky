import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Mountain } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export function generateStaticParams() {
  const locales = ['th', 'en', 'zh'] as const;
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const date = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen">
      <div className="relative w-full aspect-video max-h-96 bg-sky-light/40 flex items-center justify-center text-navy/60 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <Mountain className="h-24 w-24" />
        )}
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-navy leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 text-sm text-dark/60">
          {date} · {t('by')} {post.author}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-sky-light/30 text-navy"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg mt-8 max-w-none prose-headings:text-navy prose-a:text-orange">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 pt-8 border-t border-dark/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy hover:text-orange transition-colors"
          >
            ← {t('back_to_list')}
          </Link>
        </div>
      </article>
    </main>
  );
}

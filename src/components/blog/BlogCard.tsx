import Image from 'next/image';
import { Mountain } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Post } from '@/lib/blog';

export default function BlogCard({ post, locale }: { post: Post; locale: string }) {
  const date = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative aspect-video bg-sky-light/40 flex items-center justify-center text-navy/60 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Mountain className="h-12 w-12" />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy group-hover:text-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-dark/70 line-clamp-2">{post.description}</p>
        <div className="mt-3 text-xs text-dark/60">
          {date} · {post.author}
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
      </div>
    </Link>
  );
}

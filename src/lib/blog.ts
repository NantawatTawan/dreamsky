import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

function localeDir(locale: string) {
  return path.join(BLOG_DIR, locale);
}

function parseFile(locale: string, filename: string): Post | null {
  const filePath = path.join(localeDir(locale), filename);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug: filename.replace(/\.mdx?$/, ''),
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    author: String(data.author ?? ''),
    image: String(data.image ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

export function getAllPosts(locale: string): Post[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => parseFile(locale, f))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(locale: string, slug: string): Post | null {
  const mdx = parseFile(locale, `${slug}.mdx`);
  if (mdx) return mdx;
  return parseFile(locale, `${slug}.md`);
}

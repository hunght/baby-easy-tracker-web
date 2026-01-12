import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  tags?: string[];
  thumbnail?: string;
  thumbnail_alt_text?: string;
  content: string;
  locale?: string;
  alternates?: Record<string, string>; // { en: 'slug-en', vi: 'slug-vi' }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: `blog/${realSlug}`,
    slugAsParams: realSlug,
    title: data.title || '',
    description: data.description,
    date: data.date ? new Date(data.date).toISOString() : '',
    published: data.published !== false,
    tags: data.tags,
    thumbnail: data.thumbnail,
    thumbnail_alt_text: data.thumbnail_alt_text,
    content,
    locale: data.locale,
    alternates: data.alternates,
  };
}

/**
 * Get all posts, optionally filtered by locale.
 * Posts without a locale field default to 'en'.
 */
export function getAllPosts(locale?: string): Post[] {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, '')))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  // Filter by locale if provided
  if (locale) {
    posts = posts.filter((post) => (post.locale || 'en') === locale);
  }

  return posts;
}

export function getPostsByTag(tag: string, locale?: string): Post[] {
  return getAllPosts(locale).filter((post) => post.tags?.includes(tag));
}

export function getAllTags(locale?: string): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

import { getAllPosts } from '@/lib/blog';
import { PostItem } from '@/components/post-item';
import { Tag } from '@/components/tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/utils';
import { slug } from 'github-slugger';
import { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{
    tag: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const title = tag.split('-').join(' ');
  return {
    title: `${title} - BabyEase`,
    description: `Explore posts on the topic of ${title}. Find articles, tutorials, and insights related to ${title}.`,
    openGraph: {
      title: `${title} - BabyEase`,
      description: `Explore posts on the topic of ${title}. Find articles, tutorials, and insights related to ${title}.`,
      type: 'website',
      url: `https://easybabytracker.com/tags/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - BabyEase`,
      description: `Explore posts on the topic of ${title}. Find articles, tutorials, and insights related to ${title}.`,
    },
  };
}

export const generateStaticParams = () => {
  const locales = ['en', 'vi'];
  const paths: { locale: string; tag: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    const tags = getAllTags(posts);
    Object.keys(tags).forEach((tag) => {
      paths.push({ locale, tag: slug(tag) });
    });
  }

  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag, locale } = await params;
  // URL-decode the tag to handle Vietnamese and other non-ASCII characters
  const decodedTag = decodeURIComponent(tag);
  const title = decodedTag.split('-').join(' ');
  const posts = getAllPosts(locale);

  const displayPosts = getPostsByTagSlug(posts, decodedTag);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black capitalize lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-12 gap-3">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                      locale={locale}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No posts found for this tag.</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Related Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${title} - BabyEase`,
            description: `Explore posts on the topic of ${title}. Find articles, tutorials, and insights related to ${title}.`,
            url: `https://easybabytracker.com/${locale}/tags/${tag}`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: displayPosts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://easybabytracker.com/${locale}/${post.slug}`,
                name: post.title,
              })),
            },
          }),
        }}
      />
    </div>
  );
}

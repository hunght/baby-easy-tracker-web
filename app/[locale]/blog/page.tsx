import { getAllPosts } from '@/lib/blog';
import { PostItem } from '@/components/post-item';
import { QueryPagination } from '@/components/query-pagination';
import { Tag } from '@/components/tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllTags, sortTagsByCount } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy Baby Tracker by BabyEase Blog - Parenting Tips and Baby Care Insights',
  description:
    'Stay updated with the latest parenting tips, baby care advice, and insights on the Easy Baby Tracker by BabyEase blog.',
  openGraph: {
    title: 'Easy Baby Tracker by BabyEase Blog - Parenting Tips and Baby Care Insights',
    description:
      'Stay updated with the latest parenting tips, baby care advice, and insights on the Easy Baby Tracker by BabyEase blog.',
    url: 'https://easybabytracker.com/blog',
  },
  twitter: {
    title: 'Easy Baby Tracker by BabyEase Blog - Parenting Tips and Baby Care Insights',
    description:
      'Stay updated with the latest parenting tips, baby care advice, and insights on the Easy Baby Tracker by BabyEase blog.',
  },
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const posts = getAllPosts(locale);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const displayPosts = posts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to Easy Baby Tracker by BabyEase, your trusted companion
            for tracking your baby&apos;s daily journey. Discover parenting
            tips, baby care insights, and more.
          </p>
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
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="mt-4 justify-end"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} size="sm" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

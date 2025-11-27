import { sortPosts } from '@/lib/utils';
import { posts } from '#site/content';
import { PostItem } from '@/components/post-item';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

import { JsonLd } from 'react-schemaorg';
import { WebSite, SoftwareApplication, VideoObject } from 'schema-dts';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DownloadButton } from '@/components/download-button';
import { DownloadNowButton } from '@/components/download-now-button';
import { PlatformDownloads } from '@/components/platform-downloads';

import { siteConfig } from '@/config/site';
import { appScreenshots } from '@/config/screenshots';
import { CarouselItem } from '@/components/ui/carousel';
import { AutoPlayCarousel } from '@/components/AutoPlayCarousel';
import { GitHubButton } from '@/components/github-button';
import { EmailSubscriptionForm } from '@/components/email-subscription-form';

const description =
  'BabyEase: Free open-source baby tracking app. Log feeds, sleep, diapers, and more. Track your baby\'s daily activities with our privacy-focused mobile app for iOS and Android.';

export const metadata: Metadata = {
  title: 'BabyEase: Free Open-Source Baby Tracking App',
  description: description,
  keywords:
    'baby tracker, baby tracking app, feeding tracker, sleep tracker, diaper log, open-source, mobile app, parenting, newborn care, baby care app',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'BabyEase - Free Open-Source Baby Tracking App',
    description: description,
    type: 'website',
    url: 'https://babyease.app',
    images: [
      {
        url: 'https://babyease.app/logo-300.png',
        width: 300,
        height: 300,
        alt: 'BabyEase Logo',
      },
    ],
    siteName: 'BabyEase',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BabyEase - Free Open-Source Baby Tracking App',
    description: description,
    images: [
      {
        url: 'https://babyease.app/logo-300.png',
        alt: 'BabyEase Logo',
      },
    ],
    creator: '@buddy_beep_com',
    site: '@buddy_beep_com',
  },
  alternates: {
    canonical: 'https://babyease.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token', // Replace with your actual Google verification token if you have one
  },
};

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd<WebSite>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'BabyEase',
          url: 'https://babyease.app',

          description: description,
          inLanguage: 'en-US',
          sameAs: [
            siteConfig.links.github,
            siteConfig.links.twitter,
            siteConfig.links.discord,
          ],
        }}
      />
      <JsonLd<SoftwareApplication>
        item={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'BabyEase',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'iOS, Android',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '15',
          },
          downloadUrl: 'https://babyease.app/download',
        }}
      />
      <div className="min-h-dvh relative flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <section
            className="hero-section py-16"
            aria-label="Main hero section"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                {/* Left side - Text content */}
                <div className="flex flex-col md:w-1/2">
                  <h1
                    className="mb-6 text-4xl font-bold md:text-5xl"
                    itemProp="headline"
                  >
                    <span className="text-slate-700 dark:text-slate-200">
                      Track Your Baby's{' '}
                    </span>
                    <span className="bg-brand-gradient bg-clip-text text-transparent">Daily Journey</span>
                    <br />
                    <span className="text-slate-700 dark:text-slate-200">
                      With Ease
                    </span>
                  </h1>
                  <p
                    className="mb-8 text-lg text-muted-foreground"
                    itemProp="description"
                  >
                    Simplify parenting with BabyEase - the lightweight baby tracking app.
                    Log feeds, sleep, diapers, and milestones. View timelines and charts
                    to understand your baby's patterns. No ads, no tracking, just care.
                  </p>
                  <div className="mb-8">
                    <DownloadButton />
                  </div>

                  <PlatformDownloads />
                </div>

                {/* Right side - App screenshot */}
                <div className="mt-8 w-full md:mt-0 md:w-1/2">
                  <div className="relative">
                    <div className="absolute -left-2 -right-2 -top-2 bottom-4 z-0 rounded-full bg-brand-gradient md:-left-4 md:-right-4 md:-top-4"></div>

                    <div className="relative z-10">
                      <div className="relative overflow-hidden rounded-lg border border-slate-200 shadow-xl">
                        <AutoPlayCarousel
                          className="overflow-hidden rounded-lg"
                          interval={5000}
                          opts={{
                            align: 'center',
                            containScroll: 'trimSnaps',
                          }}
                        >
                          {appScreenshots.map((image, index) => (
                            <CarouselItem
                              key={index}
                              className="xs:basis-full sm:basis-full md:basis-full"
                            >
                              <div className="p-1">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  width={800}
                                  height={500}
                                  priority={index === 0}
                                  className="w-full rounded-md"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </AutoPlayCarousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="features-section bg-slate-800 py-16 text-white"
            aria-label="Key features section"
          >
            <div className="container mx-auto px-4">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium text-slate-300">
                  POWERFUL FEATURES
                </h3>
              </div>
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold">
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    Everything You Need for Baby Care Tracking
                  </span>
                </h2>
              </div>

              {/* Activity Tracking Feature */}
              <div className="mb-24 flex flex-col items-center md:flex-row md:items-start md:justify-between">
                <div className="mb-8 flex flex-col space-y-4 md:mb-0 md:w-2/5">
                  <h3 className="text-2xl font-bold">Smart Activity Tracking</h3>
                  <p className="text-slate-300">
                    Log all your baby's activities with a single tap. BabyEase helps you
                    track feeds, sleep, diapers, and more with an intuitive timeline view.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Feed tracking (breast & bottle)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Sleep duration & patterns</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Diaper changes & notes</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-3/5 lg:w-1/2">
                  <div className="transform overflow-hidden rounded-lg border-4 border-slate-700 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                    <Image
                      src="/screenshots/dashboard.png"
                      alt="Activity tracking interface in BabyEase"
                      width={800}
                      height={500}
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Charts & Insights Feature */}
              <div className="mb-24 flex flex-col-reverse items-center md:flex-row md:items-start md:justify-between">
                <div className="md:w-3/5 lg:w-1/2">
                  <div className="transform overflow-hidden rounded-lg border-4 border-slate-700 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                    <Image
                      src="/screenshots/player-playing.png"
                      alt="Charts and insights in BabyEase"
                      width={800}
                      height={500}
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mb-8 flex flex-col space-y-4 md:mb-0 md:w-2/5">
                  <h3 className="text-2xl font-bold">Insights & Charts</h3>
                  <p className="text-slate-300">
                    Visualize your baby's patterns and rhythms. BabyEase provides
                    beautiful charts and insights to help you understand your baby's
                    needs better.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Sleep pattern analysis</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Feeding trends</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Growth tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            className="open-source-section bg-slate-50 py-16 dark:bg-slate-900"
            aria-label="Open Source Section"
          >
            <div className="container mx-auto px-4">
              <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-bold">
                  Open Source & Privacy-Focused
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                  BabyEase is proudly open source. We believe in transparency,
                  privacy, and community-driven development. Your data stays on your device.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">Contribute</CardTitle>
                    <CardDescription>
                      Help us improve BabyEase by contributing code, reporting
                      bugs, or suggesting new features.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://github.com/hunght/BabyEase"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View on GitHub
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>

                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M12 18v-6"></path>
                      <path d="M8 18v-1"></path>
                      <path d="M16 18v-3"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">
                      Documentation
                    </CardTitle>
                    <CardDescription>
                      Explore our documentation to learn about BabyEase&apos;s
                      features, architecture, and development process.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://github.com/hunght/BabyEase#readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read Docs
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>

                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">Community</CardTitle>
                    <CardDescription>
                      Join our community of parents and developers to discuss
                      ideas, share feedback, and get support.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href={siteConfig.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Join Discord
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <div className="mb-4 inline-flex items-center justify-center space-x-2">
                  <GitHubButton
                    href="https://github.com/hunght/BabyEase/stargazers"
                    type="star"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Star</span>
                  </GitHubButton>

                  <GitHubButton
                    href="https://github.com/hunght/BabyEase/fork"
                    type="fork"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Fork</span>
                  </GitHubButton>

                  <GitHubButton
                    href="https://github.com/hunght/BabyEase/issues"
                    type="issue"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Issues</span>
                  </GitHubButton>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  BabyEase is licensed under the{' '}
                  <a
                    href="https://github.com/hunght/BabyEase/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    MIT License
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section
            className="blog-section container mx-auto px-4 py-16"
            aria-label="Latest blog posts"
          >
            <h2
              className="mb-12 text-center text-3xl font-bold"
              id="latest-posts"
            >
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostItem
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              ))}
            </div>
          </section>

          <section
            className="cta-section bg-primary/10 py-16"
            aria-label="Call to action"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-6 text-3xl font-bold" id="cta-heading">
                Ready to Simplify Baby Care?
              </h2>
              <p className="mb-8 text-lg">
                Join parents who are tracking their baby's journey more effectively with BabyEase.
              </p>
              <DownloadNowButton size="lg">
                Download BabyEase Now
              </DownloadNowButton>

              {/* Email Subscription Component */}
              <div className="mt-8 text-center">
                <p className="mb-4 text-lg font-medium">
                  Or subscribe for updates
                </p>
                <div className="mx-auto max-w-md">
                  <div className="relative">
                    <EmailSubscriptionForm />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    We&apos;ll notify you about new features, updates, and
                    parenting tips.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center space-y-4">
                <div className="mt-2 flex items-center space-x-6">
                  <GitHubButton
                    href={siteConfig.links.github}
                    type="contribute"
                    className="text-sm text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    aria-label="Contribute on GitHub"
                  >
                    Contribute on GitHub
                  </GitHubButton>
                  <GitHubButton
                    href={`${siteConfig.links.github}/issues`}
                    type="issue"
                    className="text-sm text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    aria-label="Report issues"
                  >
                    Report Issues
                  </GitHubButton>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

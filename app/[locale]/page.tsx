import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { DownloadButton } from '@/components/download-button';
import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: t('title'),
    description: t('description'),
    keywords:
      'Easy Baby Tracker, BabyEase, baby tracker, baby tracking app, feeding tracker, sleep tracker, diaper log, mobile app, parenting, newborn care, baby care app',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: siteConfig.url,
      images: [
        {
          url: `${siteConfig.url}/logo-300.png`,
          width: 300,
          height: 300,
          alt: `${siteConfig.productName} by ${siteConfig.brandName} logo`,
        },
      ],
      siteName: siteConfig.name,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `${siteConfig.url}/logo-300.png`,
          alt: `${siteConfig.productName} by ${siteConfig.brandName} logo`,
        },
      ],
      creator: '@hugboringdev',
      site: '@hugboringdev',
    },
    alternates: {
      canonical: siteConfig.url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  // Feature data
  const features = [
    {
      icon: '🍼',
      title: t('features.feeding.title'),
      description: t('features.feeding.description'),
    },
    {
      icon: '😴',
      title: t('features.sleep.title'),
      description: t('features.sleep.description'),
    },
    {
      icon: '👶',
      title: t('features.diaper.title'),
      description: t('features.diaper.description'),
    },
    {
      icon: '📊',
      title: t('features.charts.title'),
      description: t('features.charts.description'),
    },
    {
      icon: '📅',
      title: t('features.easy.title'),
      description: t('features.easy.description'),
    },
    {
      icon: '✅',
      title: t('features.habits.title'),
      description: t('features.habits.description'),
    },
  ];

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.productName,
    alternateName: siteConfig.brandName,
    url: siteConfig.url,
    description: t('description'),
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.productName,
    alternateName: siteConfig.brandName,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    downloadUrl: `${siteConfig.url}/download`,
  };

  return (
      <div className="min-h-dvh flex flex-col bg-gradient-to-b from-[#5B7FFF]/5 via-white to-[#FF8AB8]/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <SiteHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
                {/* Left - Text Content */}
                <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('hero.brand')}
                  </p>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    <span className="text-slate-800 dark:text-white">
                      {t('hero.titlePart1')}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#5B7FFF] to-[#FF8AB8] bg-clip-text text-transparent">
                      {t('hero.titlePart2')}
                    </span>
                  </h1>

                  <p className="mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-300">
                    {t('hero.subtitle')}
                  </p>

                  <DownloadButton />

                  {/* App Store Rating */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span>{t('hero.rating')}</span>
                  </div>
                </div>

                {/* Right - Phone Mockup / Video Demo */}
                <div className="relative md:w-1/2">
                  {locale === 'vi' ? (
                    // Video demo for Vietnamese - no frame needed
                    <div className="relative mx-auto max-w-sm rounded-2xl bg-black shadow-2xl overflow-hidden">
                      <video
                        src="/demo-vi.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full"
                      />
                    </div>
                  ) : (
                    // Phone mockup for other languages
                    <div className="relative mx-auto max-w-xs">
                      <div className="absolute inset-0 -rotate-3 rounded-[3rem] bg-gradient-to-br from-[#5B7FFF] to-[#FF8AB8] opacity-20 blur-2xl" />
                      <div className="relative rotate-3 transform transition-transform hover:rotate-0">
                        <div className="overflow-hidden rounded-[2.5rem] border-8 border-slate-800 bg-slate-800 shadow-2xl dark:border-slate-700">
                          <Image
                            src="/screenshots/01-tracking.png"
                            alt="Easy Baby Tracker app showing activity tracking"
                            width={390}
                            height={844}
                            priority
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white dark:bg-slate-800/50">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                  {t('features.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('features.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-2xl bg-slate-50 p-6 text-center transition-shadow hover:shadow-lg dark:bg-slate-700/50"
                  >
                    <span className="mb-3 text-4xl">{feature.icon}</span>
                    <h3 className="mb-1 font-semibold text-slate-800 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* App Features Showcase - Vietnamese only */}
          {locale === 'vi' && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <Image
                  src="/features-showcase-vi.png"
                  alt="Các tính năng chính của Easy Baby Tracker"
                  width={1920}
                  height={1080}
                  className="w-full rounded-2xl"
                  priority
                />
              </div>
            </section>
          )}

          {/* App Screenshots */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                  {t('screenshots.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('screenshots.subtitle')}
                </p>
              </div>

              <div className="flex justify-center gap-4 overflow-x-auto pb-4 md:gap-8">
                {[
                  '/screenshots/01-tracking.png',
                  '/screenshots/03-easy.png',
                  '/screenshots/04-scheduling.png',
                ].map((src, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 overflow-hidden rounded-2xl border-4 border-slate-200 shadow-lg dark:border-slate-700"
                    style={{
                      transform: `rotate(${index === 1 ? 0 : index === 0 ? -5 : 5}deg)`,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Easy Baby Tracker app screenshot ${index + 1}`}
                      width={200}
                      height={433}
                      className="w-40 md:w-48"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof / Testimonial */}
          <section className="py-16 bg-gradient-to-r from-[#5B7FFF] to-[#FF8AB8] text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="mx-auto max-w-2xl">
                <svg
                  className="mx-auto mb-4 h-10 w-10 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="mb-4 text-xl md:text-2xl font-medium">
                  &quot;{t('testimonial.quote')}&quot;
                </blockquote>
                <p className="text-white/80">— {t('testimonial.author')}</p>
              </div>
            </div>
          </section>

          {/* Parent-Facing Community */}
          <section className="py-16 bg-white dark:bg-slate-800/50">
            <div className="container mx-auto px-4 text-center">
              <div className="mx-auto max-w-2xl">
                <h2 className="mb-3 text-3xl font-bold text-slate-800 dark:text-white">
                  {t('community.title')}
                </h2>
                <p className="mb-6 text-slate-600 dark:text-slate-300">
                  {t('community.subtitle')}
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href={`/${locale}/blog`}
                    className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    {t('community.ctaBlog')}
                  </Link>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-400"
                  >
                    {t('community.ctaX')}
                  </a>
                </div>
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  {t('community.note')}
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                {t('cta.title')}
              </h2>
              <p className="mb-8 text-slate-600 dark:text-slate-300">
                {t('cta.subtitle')}
              </p>
              <div className="flex justify-center">
                <DownloadButton />
              </div>

              <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span>✓ {t('cta.features.free')}</span>
                <span>✓ {t('cta.features.noAds')}</span>
                <span>✓ {t('cta.features.privacy')}</span>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
  );
}

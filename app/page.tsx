import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { JsonLd } from 'react-schemaorg';
import { WebSite, SoftwareApplication } from 'schema-dts';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { DownloadButton } from '@/components/download-button';
import { siteConfig } from '@/config/site';

const description =
  "BabyEase: Free open-source baby tracking app. Log feeds, sleep, diapers, and more. Track your baby's daily activities with our privacy-focused mobile app for iOS and Android.";

export const metadata: Metadata = {
  title: 'BabyEase: Free Baby Tracking App for iOS & Android',
  description: description,
  keywords:
    'baby tracker, baby tracking app, feeding tracker, sleep tracker, diaper log, open-source, mobile app, parenting, newborn care, baby care app',
  openGraph: {
    title: 'BabyEase - Free Baby Tracking App',
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
    title: 'BabyEase - Free Baby Tracking App',
    description: description,
    images: [
      {
        url: 'https://babyease.app/logo-300.png',
        alt: 'BabyEase Logo',
      },
    ],
    creator: '@hugboringdev',
    site: '@hugboringdev',
  },
  alternates: {
    canonical: 'https://babyease.app',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Feature data
const features = [
  {
    icon: '🍼',
    title: 'Feeding',
    description: 'Track breastfeeding, bottle feeds, and solid foods',
  },
  {
    icon: '😴',
    title: 'Sleep',
    description: 'Log naps and nighttime sleep with duration',
  },
  {
    icon: '👶',
    title: 'Diapers',
    description: 'Record diaper changes with wetness and notes',
  },
  {
    icon: '📊',
    title: 'Charts',
    description: 'Visualize patterns with beautiful charts',
  },
  {
    icon: '📅',
    title: 'EASY Schedule',
    description: 'Follow Eat-Activity-Sleep-You routines',
  },
  {
    icon: '✅',
    title: 'Habits',
    description: 'Track daily habits and milestones',
  },
];

export default function Home() {
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
          downloadUrl: 'https://babyease.app/download',
        }}
      />

      <div className="min-h-dvh flex flex-col bg-gradient-to-b from-[#5B7FFF]/5 via-white to-[#FF8AB8]/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <SiteHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
                {/* Left - Text Content */}
                <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
                  <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    <span className="text-slate-800 dark:text-white">
                      Track Your Baby&apos;s
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#5B7FFF] to-[#FF8AB8] bg-clip-text text-transparent">
                      Daily Journey
                    </span>
                  </h1>

                  <p className="mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-300">
                    The simple, free baby tracking app. Log feeds, sleep, and
                    diapers with one tap. No ads, no subscriptions.
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
                    <span>4.9 rating • Free on iOS & Android</span>
                  </div>
                </div>

                {/* Right - Phone Mockup */}
                <div className="relative md:w-1/2">
                  <div className="relative mx-auto max-w-xs">
                    {/* Phone frame effect */}
                    <div className="absolute inset-0 -rotate-3 rounded-[3rem] bg-gradient-to-br from-[#5B7FFF] to-[#FF8AB8] opacity-20 blur-2xl" />
                    <div className="relative rotate-3 transform transition-transform hover:rotate-0">
                      <div className="overflow-hidden rounded-[2.5rem] border-8 border-slate-800 bg-slate-800 shadow-2xl dark:border-slate-700">
                        <Image
                          src="/screenshots/01-tracking.png"
                          alt="BabyEase app showing activity tracking"
                          width={390}
                          height={844}
                          priority
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white dark:bg-slate-800/50">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                  Everything You Need
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Simple, powerful tools for busy parents
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

          {/* App Screenshots */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                  Designed for One Hand
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Track everything while holding your baby
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
                      alt={`BabyEase app screenshot ${index + 1}`}
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
                  &quot;Finally, a baby app that doesn&apos;t overwhelm me. Simple,
                  fast, and actually useful!&quot;
                </blockquote>
                <p className="text-white/80">— Happy Parent</p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
                Ready to Simplify Baby Care?
              </h2>
              <p className="mb-8 text-slate-600 dark:text-slate-300">
                Join thousands of parents tracking with ease.
              </p>
              <div className="flex justify-center">
                <DownloadButton />
              </div>

              <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span>✓ Free forever</span>
                <span>✓ No ads</span>
                <span>✓ Privacy-focused</span>
              </div>
            </div>
          </section>
        </main>

        {/* Simplified Footer */}
        <footer className="border-t border-slate-200 py-8 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="BabyEase"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="font-semibold text-slate-800 dark:text-white">
                  BabyEase
                </span>
              </div>

              <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-white">
                  Privacy
                </Link>
                <Link href="/blog" className="hover:text-slate-800 dark:hover:text-white">
                  Blog
                </Link>
                <Link href="/feedback" className="hover:text-slate-800 dark:hover:text-white">
                  Feedback
                </Link>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-800 dark:hover:text-white"
                >
                  X / Twitter
                </a>
              </div>

              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} BabyEase
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

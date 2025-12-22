'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLd } from 'react-schemaorg';
import { SoftwareApplication } from 'schema-dts';
import { appLinks } from '@/config/app-links';

const DownloadPage = () => {
  return (
    <>
      {/* Structured Data for SEO */}
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
          downloadUrl: 'https://easybabytracker.com/download',
          description:
            'The lightweight baby tracking app to log feeds, sleep, diapers, and more.',
          image: 'https://easybabytracker.com/logo-300.png',
          author: {
            '@type': 'Person',
            name: 'Hung Hoang',
          },
        }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 md:p-12"
        >
          <div className="mb-8 text-center">
            <Image
              src="/logo-300.png"
              alt="BabyEase Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 h-24 w-24"
            />
            <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
              Download BabyEase
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The lightweight baby tracking app for busy parents
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {/* iOS Download */}
            <a
              href={appLinks.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 rounded-xl bg-black px-6 py-4 text-white transition-transform hover:scale-105"
            >
              <FaApple className="text-3xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-xl font-semibold">App Store</p>
              </div>
            </a>

            {/* Android Download */}
            <a
              href={appLinks.android}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 rounded-xl bg-green-600 px-6 py-4 text-white transition-transform hover:scale-105"
            >
              <FaGooglePlay className="text-3xl" />
              <div className="text-left">
                <p className="text-xs">Get it on</p>
                <p className="text-xl font-semibold">Google Play</p>
              </div>
            </a>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-white">
              What you can track
            </h2>
            <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-slate-700">
                <span className="text-2xl">🍼</span>
                <p className="mt-1 text-sm font-medium">Feeding</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 dark:bg-slate-700">
                <span className="text-2xl">😴</span>
                <p className="mt-1 text-sm font-medium">Sleep</p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-3 dark:bg-slate-700">
                <span className="text-2xl">👶</span>
                <p className="mt-1 text-sm font-medium">Diapers</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3 dark:bg-slate-700">
                <span className="text-2xl">📈</span>
                <p className="mt-1 text-sm font-medium">Growth</p>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">
              Have questions? Check our{' '}
              <Link
                href="/blog"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                Blog
              </Link>{' '}
              or{' '}
              <Link
                href="/feedback"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                send feedback
              </Link>
              .
            </p>
            <p className="text-sm">
              By downloading, you agree to our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default DownloadPage;

import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BabyEase Pricing - Free Baby Tracking App',
  description:
    'BabyEase is completely free! Explore our open-source baby tracking app with no hidden fees.',
  openGraph: {
    title: 'BabyEase Pricing - Free Baby Tracking App',
    description:
      'BabyEase is completely free! Explore our open-source baby tracking app with no hidden fees.',
    url: 'https://easybabytracker.com/pricing',
  },
  twitter: {
    title: 'BabyEase Pricing - Free Baby Tracking App',
    description:
      'BabyEase is completely free! Explore our open-source baby tracking app with no hidden fees.',
  },
};

const PricingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-center text-4xl font-bold">
        Simple, Transparent Pricing
      </h1>
      <p className="mb-12 text-center text-lg">
        Just kidding, it&apos;s totally free!
      </p>
      <p className="text-center text-xl font-semibold">
        We believe in supporting parents, not emptying wallets. Enjoy BabyEase
        without spending a single penny!
      </p>
    </div>
  );
};

export default PricingPage;

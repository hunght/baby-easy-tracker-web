import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy Baby Tracker by BabyEase Pricing - Free Baby Tracking App',
  description:
    'Easy Baby Tracker by BabyEase is completely free. No ads, no subscriptions, and privacy-first.',
  openGraph: {
    title: 'Easy Baby Tracker by BabyEase Pricing - Free Baby Tracking App',
    description:
      'Easy Baby Tracker by BabyEase is completely free. No ads, no subscriptions, and privacy-first.',
    url: 'https://easybabytracker.com/pricing',
  },
  twitter: {
    title: 'Easy Baby Tracker by BabyEase Pricing - Free Baby Tracking App',
    description:
      'Easy Baby Tracker by BabyEase is completely free. No ads, no subscriptions, and privacy-first.',
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
        We believe in supporting parents, not emptying wallets. Enjoy Easy Baby
        Tracker by BabyEase without spending a single penny.
      </p>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        No ads. No subscriptions. Privacy-first by design.
      </p>
    </div>
  );
};

export default PricingPage;

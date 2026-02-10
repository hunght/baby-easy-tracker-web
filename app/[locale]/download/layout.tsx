import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Easy Baby Tracker by BabyEase - Free Baby Tracking App for iOS & Android',
  description:
    'Download Easy Baby Tracker by BabyEase for free. Log feeds, sleep, and diapers with one tap. No ads, no subscriptions. Privacy-first on iOS and Android.',
  keywords:
    'download Easy Baby Tracker, BabyEase, baby tracker app, free baby app, feeding tracker, sleep tracker, diaper log, iOS, Android, parenting app',
  openGraph: {
    title: 'Download Easy Baby Tracker by BabyEase - Free Baby Tracking App',
    description:
      'Download Easy Baby Tracker by BabyEase for free. Track feeds, sleep, and diapers with one tap.',
    type: 'website',
    url: 'https://easybabytracker.com/download',
    images: [
      {
        url: 'https://easybabytracker.com/logo-300.png',
        width: 300,
        height: 300,
        alt: 'Easy Baby Tracker by BabyEase logo',
      },
    ],
    siteName: 'Easy Baby Tracker by BabyEase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Easy Baby Tracker by BabyEase - Free Baby Tracking App',
    description:
      'Download Easy Baby Tracker by BabyEase for free. One-tap tracking for busy parents.',
    images: ['https://easybabytracker.com/logo-300.png'],
    creator: '@buddy_beep_com',
  },
  alternates: {
    canonical: 'https://easybabytracker.com/download',
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
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

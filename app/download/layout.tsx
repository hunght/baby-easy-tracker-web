import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download BabyEase - Free Baby Tracking App for iOS & Android',
  description:
    'Download BabyEase for free. The lightweight baby tracking app to log feeds, sleep, diapers, and more. Available on iOS App Store and Google Play. Open-source and privacy-focused.',
  keywords:
    'download BabyEase, baby tracker app, free baby app, feeding tracker, sleep tracker, diaper log, iOS, Android, parenting app',
  openGraph: {
    title: 'Download BabyEase - Free Baby Tracking App',
    description:
      'Download BabyEase for free. Track your baby\'s feeds, sleep, and diapers. Available on iOS and Android.',
    type: 'website',
    url: 'https://easybabytracker.com/download',
    images: [
      {
        url: 'https://easybabytracker.com/logo-300.png',
        width: 300,
        height: 300,
        alt: 'BabyEase Logo',
      },
    ],
    siteName: 'BabyEase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download BabyEase - Free Baby Tracking App',
    description:
      'Download BabyEase for free. Available on iOS and Android. The lightweight baby tracking app for busy parents.',
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

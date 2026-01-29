'use client';

import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { Smartphone } from 'lucide-react';
import { appLinks } from '@/config/app-links';

interface DownloadCtaBannerProps {
  locale: 'en' | 'vi';
}

export function DownloadCtaBanner({ locale }: DownloadCtaBannerProps) {
  const content = {
    en: {
      title: 'Get the Full Experience',
      description:
        'This is a web demo. Download BabyEase app for offline access, notifications, and all premium features - completely free!',
      appStore: 'App Store',
      playStore: 'Google Play',
    },
    vi: {
      title: 'Trải nghiệm đầy đủ',
      description:
        'Đây là bản demo trên web. Tải ứng dụng BabyEase để sử dụng offline, nhận thông báo và tất cả tính năng cao cấp - hoàn toàn miễn phí!',
      appStore: 'App Store',
      playStore: 'Google Play',
    },
  };

  const t = content[locale];

  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#FF8AB8] p-6 text-white shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <Smartphone className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-bold">{t.title}</h3>
        <p className="mb-4 text-sm text-white/90">{t.description}</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={appLinks.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-black/80 px-5 py-2.5 text-white transition-transform hover:scale-105"
          >
            <FaApple className="text-xl" />
            <div className="text-left">
              <p className="text-[9px] leading-tight opacity-80">Download on</p>
              <p className="text-sm font-semibold leading-tight">
                {t.appStore}
              </p>
            </div>
          </a>

          <a
            href={appLinks.android}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-white transition-transform hover:scale-105 hover:bg-white/30"
          >
            <FaGooglePlay className="text-xl" />
            <div className="text-left">
              <p className="text-[9px] leading-tight opacity-80">Get it on</p>
              <p className="text-sm font-semibold leading-tight">
                {t.playStore}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

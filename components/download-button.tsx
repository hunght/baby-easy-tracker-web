'use client';

import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { appLinks } from '@/config/app-links';

export function DownloadButton() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* iOS App Store Button */}
      <a
        href={appLinks.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-3 rounded-xl bg-black px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      >
        <FaApple className="text-2xl" />
        <div className="text-left">
          <p className="text-[10px] leading-tight">Download on the</p>
          <p className="text-lg font-semibold leading-tight">App Store</p>
        </div>
      </a>

      {/* Google Play Button */}
      <a
        href={appLinks.android}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      >
        <FaGooglePlay className="text-2xl" />
        <div className="text-left">
          <p className="text-[10px] leading-tight">Get it on</p>
          <p className="text-lg font-semibold leading-tight">Google Play</p>
        </div>
      </a>
    </div>
  );
}

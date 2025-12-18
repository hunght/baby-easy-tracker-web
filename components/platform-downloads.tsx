'use client';

import { FaApple, FaGooglePlay, FaGithub } from 'react-icons/fa';
import { appLinks } from '@/config/app-links';

export function PlatformDownloads() {
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-sm text-muted-foreground">Available on</p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={appLinks.ios}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 rounded-md bg-foreground/5 px-3 py-1 transition-colors hover:bg-foreground/10 dark:bg-background/60 dark:hover:bg-background/40"
          aria-label="Download on the App Store"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <FaApple className="text-foreground/80" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Download on</span>
            <span className="text-sm font-medium text-foreground">App Store</span>
          </div>
        </a>

        <a
          href={appLinks.android}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 rounded-md bg-success/10 px-3 py-1 transition-colors hover:bg-success/20"
          aria-label="Get it on Google Play"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <FaGooglePlay className="text-success" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-success/80">Get it on</span>
            <span className="text-sm font-medium text-success">Google Play</span>
          </div>
        </a>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <a
          href={appLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-primary hover:underline"
          aria-label="View source on GitHub"
        >
          <FaGithub className="mr-1" />
          View source on GitHub
        </a>
      </div>
    </div>
  );
}

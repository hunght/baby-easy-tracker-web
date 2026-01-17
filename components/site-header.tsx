'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

import { DownloadNowButton } from './download-now-button';
import { MobileNav } from './mobile-nav';
import { ModeToggle } from './mode-toggle';
import { LocaleSwitcher } from './locale-switcher';

interface SiteHeaderProps {
  isLoginPage?: boolean;
}

export function SiteHeader({ isLoginPage = false }: SiteHeaderProps) {
  const t = useTranslations('Navigation');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="BabyEase"
              width={56}
              height={56}
              priority
              className="h-10 w-auto"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              BabyEase
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/easy-schedule"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('easySchedule')}
            </Link>
            {locale === 'vi' && (
              <Link
                href="/lich-tiem-chung"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t('vaccination')}
              </Link>
            )}
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('blog')}
            </Link>
            <Link
              href="/feedback"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('feedback')}
            </Link>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <LocaleSwitcher />
            </div>
          </nav>

          <DownloadNowButton />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}

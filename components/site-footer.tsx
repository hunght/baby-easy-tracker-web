import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  const t = useTranslations('Navigation');

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt={`${siteConfig.productName} by ${siteConfig.brandName}`}
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-slate-800 dark:text-white">
                {siteConfig.productName}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                by {siteConfig.brandName}
              </span>
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-white">
              {t('privacy')}
            </Link>
            <Link href="/blog" className="hover:text-slate-800 dark:hover:text-white">
              {t('blog')}
            </Link>
            <Link href="/feedback" className="hover:text-slate-800 dark:hover:text-white">
              {t('feedback')}
            </Link>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-white"
            >
              {t('twitter')}
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-white"
            >
              {t('openSource')}
            </a>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}

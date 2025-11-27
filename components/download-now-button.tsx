'use client';

import { MouseEventHandler } from 'react';

import { handleDownload } from '@/utils/handleDownload';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface DownloadNowButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function DownloadNowButton({
  className,
  children = 'Grab it now',
  variant = 'default',
  size = 'sm',
}: DownloadNowButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleDownload();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant, size }),
        className ||
          'rounded-full bg-brand-gradient px-6 font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
      )}
    >
      {children}
    </button>
  );
}

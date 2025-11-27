'use client';

import { MouseEventHandler } from 'react';

import { handleDownload } from '@/utils/handleDownload';

export function DownloadButton() {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleDownload();
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center rounded-full bg-brand-gradient px-10 py-4 text-base font-semibold text-white shadow-xl shadow-primary/30 transition hover:translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      Get the tracker for Free!
      <span className="absolute -right-4 -top-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
      </span>
    </button>
  );
}

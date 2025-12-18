import { appLinks } from '@/config/app-links';

export const handleDownload = () => {
  if (typeof window === 'undefined') {
    return;
  }

  // Detect mobile platform and redirect to appropriate store
  const userAgent = window.navigator.userAgent;
  
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    window.location.href = appLinks.ios;
  } else if (/Android/i.test(userAgent)) {
    window.location.href = appLinks.android;
  } else {
    // Desktop users - show download page with both options
    window.location.href = '/download';
  }
};

export const getPlatformDownloadUrl = (): string => {
  if (typeof window === 'undefined') {
    return '/download';
  }

  const userAgent = window.navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return appLinks.ios;
  } else if (/Android/i.test(userAgent)) {
    return appLinks.android;
  }

  return '/download';
};

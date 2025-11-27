const DEFAULT_RELEASE_URL =
  'https://github.com/hunght/LearnifyTube/releases/latest';

export const handleDownload = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.location.href = DEFAULT_RELEASE_URL;
};

export const getPlatformDownloadUrl = (customAppLinks: {
  windows: string;
  macos: string;
  linux: string;
  releases: string;
  macosIntel: string;
  linuxRpm: string;
}): string => {
  if (typeof window === 'undefined') {
    return customAppLinks.releases;
  }

  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf('Windows') !== -1) {
    return customAppLinks.windows;
  } else if (userAgent.indexOf('Mac') !== -1) {
    if (userAgent.indexOf('ARM') !== -1) {
      return customAppLinks.macos;
    } else {
      return customAppLinks.macosIntel || customAppLinks.macos;
    }
  } else if (userAgent.indexOf('Linux') !== -1) {
    return customAppLinks.linux;
  }

  return customAppLinks.releases;
};

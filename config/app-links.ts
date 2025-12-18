// Configuration file for application download links

export const appLinks = {
  // App Store links
  ios: 'https://apps.apple.com/us/app/easy-baby-tracker/id6755802501',
  android: 'https://play.google.com/store/apps/details?id=com.hunght.BabyEase',

  // GitHub repository
  github: 'https://github.com/hunght/easy-baby-tracker',

  // Social links
  twitter: 'https://x.com/hugboringdev',
};

// For backward compatibility
export const buildAppLinks = (_version: string) => ({
  ios: appLinks.ios,
  android: appLinks.android,
  releases: appLinks.github,
});

export async function getLatestVersionFromApi(): Promise<string> {
  // For mobile apps, we don't need to fetch version from GitHub
  // Return app version from config
  return '1.0.15';
}

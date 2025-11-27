// Configuration file for application download links and version information

// Function to build download URLs based on a version
export const buildAppLinks = (version: string) => ({
  // Main platform download links
  windows: `https://github.com/hunght/LearnifyTube/releases/download/v${version}/LearnifyTube-${version}.Setup.exe`,
  macos: `https://github.com/hunght/LearnifyTube/releases/download/v${version}/LearnifyTube-${version}-arm64.dmg`,
  linux: `https://github.com/hunght/LearnifyTube/releases/download/v${version}/LearnifyTube_${version}_amd64.deb`,

  // Additional links
  releases: `https://github.com/hunght/LearnifyTube/releases`,

  // You can add other platform-specific links if needed
  macosIntel: `https://github.com/hunght/LearnifyTube/releases/download/v${version}/LearnifyTube-${version}-x64.dmg`,
  linuxRpm: `https://github.com/hunght/LearnifyTube/releases/download/v${version}/LearnifyTube-${version}-1.x86_64.rpm`,
});

// Client-side version getter that uses the API
export async function getLatestVersionFromApi(): Promise<string> {
  const response = await fetch(
    'https://api.github.com/repos/hunght/LearnifyTube/releases/latest',
  );

  if (!response.ok) {
    throw {
      status: 'error',
      message: 'Failed to check for updates. Please try again later.',
      hasUpdate: false,
    };
  }

  const release = await response.json();
  const latestVersion = release.tag_name.replace('v', '');

  return latestVersion;
}

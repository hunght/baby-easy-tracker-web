const ADMIN_AUTH_REALM = 'Admin Area';

function decodeBase64(input: string): string {
  if (typeof atob === 'function') {
    return atob(input);
  }
  return Buffer.from(input, 'base64').toString('utf8');
}

function parseBasicAuthorization(authorization: string | null): { username: string; password: string } | null {
  if (!authorization || !authorization.startsWith('Basic ')) {
    return null;
  }

  const encoded = authorization.slice('Basic '.length).trim();
  if (!encoded) {
    return null;
  }

  try {
    const decoded = decodeBase64(encoded);
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) {
      return null;
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);
    return { username, password };
  } catch {
    return null;
  }
}

export function isAdminPath(pathname: string): boolean {
  if (pathname.startsWith('/api/admin/')) {
    return true;
  }
  return /^\/(en|vi)\/admin(?:\/|$)/.test(pathname);
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_BASIC_AUTH_USER && process.env.ADMIN_BASIC_AUTH_PASSWORD);
}

export function isAdminAuthorized(authorization: string | null): boolean {
  const expectedUser = process.env.ADMIN_BASIC_AUTH_USER;
  const expectedPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const parsed = parseBasicAuthorization(authorization);
  if (!parsed) {
    return false;
  }

  return parsed.username === expectedUser && parsed.password === expectedPassword;
}

export function getAdminAuthChallengeHeader(): string {
  return `Basic realm="${ADMIN_AUTH_REALM}", charset="UTF-8"`;
}

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminAuthChallengeHeader,
  isAdminAuthConfigured,
  isAdminAuthorized,
  isAdminPath,
} from '@/lib/admin-auth';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname)) {
    if (!isAdminAuthConfigured()) {
      return new NextResponse('Admin protection is not configured on the server.', { status: 500 });
    }

    if (!isAdminAuthorized(request.headers.get('authorization'))) {
      return new NextResponse('Authentication required.', {
        status: 401,
        headers: {
          'WWW-Authenticate': getAdminAuthChallengeHeader(),
        },
      });
    }
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};

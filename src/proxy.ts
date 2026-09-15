import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '@/core/i18n/config';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  intlResponse.headers.set('x-pathname', request.nextUrl.pathname);
  intlResponse.headers.set('x-url', request.url);
  intlResponse.headers.delete('Set-Cookie');

  const cacheControl = 'public, s-maxage=3600, stale-while-revalidate=14400';
  intlResponse.headers.set('Cache-Control', cacheControl);
  intlResponse.headers.set('CDN-Cache-Control', cacheControl);

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
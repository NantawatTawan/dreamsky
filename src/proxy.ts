import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { MAINTENANCE_MODE_ENABLED, renderMaintenanceHtml } from '@/lib/maintenance';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (MAINTENANCE_MODE_ENABLED) {
    return new NextResponse(renderMaintenanceHtml(), {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Retry-After': '3600',
      },
    });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware
 *
 * Provides protection against:
 * - CSRF attacks (Cross-Site Request Forgery)
 * - Unauthorized cross-origin requests
 */
export function middleware(request: NextRequest) {
  // CSRF Protection: Check origin for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // Allow requests without origin header (same-origin requests)
    // or from allowed origins
    if (origin) {
      const originHost = new URL(origin).host;

      // Check if origin matches the host
      if (originHost !== host) {
        console.warn(`CSRF attempt blocked: origin=${origin}, host=${host}`);
        return NextResponse.json(
          {
            error: 'Invalid origin',
            message: 'Request origin does not match server host'
          },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',

    // Exclude Next.js internal routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

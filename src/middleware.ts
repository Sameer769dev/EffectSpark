
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  const publicPaths = ['/', '/api/auth', '/profile'];

  // Check if the path is public
  if (pathname === '/' || pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.endsWith('.png') || pathname.endsWith('.ico') || pathname.endsWith('.webmanifest')) {
      return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // Allow access to the profile page to login
  if (pathname.startsWith('/profile')) {
      return NextResponse.next();
  }

  // If user is not logged in, redirect to profile page to log in
  if (!isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  // If user is logged in but hasn't completed their profile,
  // redirect them to the creation page, unless they are already there.
  if (isLoggedIn && !profileComplete && pathname !== '/profile/create') {
    const url = request.nextUrl.clone();
    url.pathname = '/profile/create';
    return NextResponse.redirect(url);
  }

  // If the user is logged in and has completed their profile, but tries to access the creation page,
  // redirect them to the generator.
  if (isLoggedIn && profileComplete && pathname === '/profile/create') {
     const url = request.nextUrl.clone();
     url.pathname = '/generator';
     return NextResponse.redirect(url);
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

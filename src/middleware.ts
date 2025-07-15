
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public files and API routes
  if (
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/static/') || 
    pathname.endsWith('.png') || 
    pathname.endsWith('.ico') || 
    pathname.endsWith('.webmanifest') ||
    pathname === '/' // Landing page is public
  ) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // Allow access to the profile page for login/viewing
  if (pathname.startsWith('/profile')) {
      // If user is logged in but profile is not complete, redirect from /profile to /profile/create
      if (isLoggedIn && !profileComplete && pathname === '/profile') {
        const url = request.nextUrl.clone();
        url.pathname = '/profile/create';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
  }
  
  // If user is not logged in, redirect any other page to the profile page to log in
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
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest
     * - png images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|manifest.webmanifest).*)',
  ],
};

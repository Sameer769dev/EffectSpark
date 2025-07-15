
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

const publicPages = [
  '/',
  '/login',
  '/about',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
];

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
    publicPages.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // If user is not logged in, redirect any protected page to the login page
  if (!isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(url);
  }
  
  // If user is logged in but hasn't completed their profile,
  // redirect them to the creation page, unless they are already there.
  if (!profileComplete && pathname !== '/profile/create') {
    const url = request.nextUrl.clone();
    url.pathname = '/profile/create';
    return NextResponse.redirect(url);
  }

  // If the user is logged in and has completed their profile, but tries to access the creation page,
  // redirect them to the generator.
  if (profileComplete && pathname === '/profile/create') {
     const url = request.nextUrl.clone();
     url.pathname = '/generator';
     return NextResponse.redirect(url);
  }

  // If a logged-in user tries to access the login page, redirect them to the generator
  if (isLoggedIn && pathname === '/login') {
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

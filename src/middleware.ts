
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

const publicPaths = [
  '/',
  '/login',
  '/about',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
  '/api/auth/google',
  '/api/auth/callback',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Ignore Next.js internal paths, static files, and all API routes (except auth ones for redirects)
  if (
    path.startsWith('/_next') ||
    path.startsWith('/static') ||
    path.includes('.') ||
    (path.startsWith('/api/') && !publicPaths.some(p => path.startsWith(p)))
  ) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // If path is public, allow access
  if (isPublicPath) {
    // But if a logged-in user tries to access /login, redirect to generator
    if (isLoggedIn && path.startsWith('/login')) {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
    return NextResponse.next();
  }

  // If user is not logged in, redirect them to the login page for any non-public path.
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', path);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in but their profile is not complete...
  if (!profileComplete) {
    // and they are not already on the profile creation page, redirect them there.
    if (path !== '/profile/create') {
      return NextResponse.redirect(new URL('/profile/create', request.url));
    }
  } 
  // If their profile IS complete...
  else {
    // but they are trying to access profile creation, redirect them to the main app page.
    if (path === '/profile/create') {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
  }

  // If none of the above conditions are met, the user is authenticated and authorized.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};

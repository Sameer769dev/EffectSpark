
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

// Define paths that are public and don't require authentication.
const publicPaths = [
  '/',
  '/login',
  '/about',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
];

const isPublic = (path: string) => {
  // Allow root page and any other public paths
  if (publicPaths.includes(path)) {
    return true;
  }
  // Allow API routes to be accessed without auth checks in middleware
  if (path.startsWith('/api/')) {
      return true;
  }
  // Allow static assets and image optimization routes
  if (path.startsWith('/_next') || path.startsWith('/static') || /\.(png|ico|webmanifest|svg|jpg)$/.test(path)) {
    return true;
  }
  return false;
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (isPublic(path)) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Preserve the original destination to redirect after login
    url.searchParams.set('redirect_to', path);
    return NextResponse.redirect(url);
  }

  // If user is logged in but profile is not complete
  if (!profileComplete) {
    // and they are not trying to create their profile, redirect them
    if (path !== '/profile/create') {
      return NextResponse.redirect(new URL('/profile/create', request.url));
    }
  } 
  // If user is logged in and profile is complete
  else {
    // but they are trying to access login or profile creation, redirect them away
    if (path === '/login' || path === '/profile/create') {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for the ones that are likely static assets.
  matcher: '/((?!_next/image|favicon.ico).*)',
};

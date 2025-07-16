
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
  // API routes used for authentication should be public
  '/api/auth/google',
  '/api/auth/callback',
];

const isPublic = (path: string) => {
  return publicPaths.includes(path);
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow all requests for static files and images to pass through.
  if (path.startsWith('/_next') || path.startsWith('/static') || /\.(png|ico|webmanifest|svg|jpg)$/.test(path)) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  const isPublicPage = isPublic(path);

  // If user is logged in
  if (isLoggedIn) {
    // and profile is complete...
    if (profileComplete) {
      // prevent them from accessing login or profile creation pages.
      if (path === '/login' || path === '/profile/create') {
        return NextResponse.redirect(new URL('/generator', request.url));
      }
    } 
    // if profile is NOT complete...
    else {
      // force them to the profile creation page.
      if (path !== '/profile/create' && !path.startsWith('/api')) {
        return NextResponse.redirect(new URL('/profile/create', request.url));
      }
    }
  } 
  // If user is NOT logged in...
  else {
    // and the page is not public, redirect to login.
    if (!isPublicPage && !path.startsWith('/api/auth')) {
       const url = request.nextUrl.clone();
       url.pathname = '/login';
       url.searchParams.set('redirect_to', path);
       return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for the ones that are likely static assets.
  matcher: '/((?!_next/image|favicon.ico).*)',
};

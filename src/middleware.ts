
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
  '/api/auth/google',
  '/api/auth/callback',
];

const isPublic = (path: string) => {
  return (
    publicPaths.includes(path) ||
    path.startsWith('/api/') // Exclude all API routes from middleware checks
  );
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Ignore Next.js internal paths and public files
  if (path.startsWith('/_next') || path.startsWith('/static') || /\.(.*)$/.test(path)) {
    return NextResponse.next();
  }

  // If the path is public, no action is needed.
  if (isPublic(path)) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // If user is not logged in, redirect them to the login page.
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
  // and their profile IS complete...
  else {
    // but they are trying to access login or profile creation, redirect them to the main app page.
    if (path === '/login' || path === '/profile/create') {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
  }

  // If none of the above conditions are met, the user is authenticated and authorized.
  return NextResponse.next();
}

export const config = {
  // Match all paths except for the ones starting with `/_next` or contain a `.` (static files)
  matcher: ['/((?!_next|.*\\..*).*)'],
};

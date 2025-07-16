
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
  if (publicPaths.includes(path)) {
    return true;
  }
  // Allow INTERNAL API routes to be accessed without auth checks in middleware,
  // as they will be called by pages which are already protected.
  // The logout route is an exception as it's called directly.
  if (path.startsWith('/api/') && path !== '/api/auth/logout') {
      return true;
  }
  // Allow static assets and image optimization routes
  if (path.startsWith('/_next') || /\.(png|ico|webmanifest|svg|jpg|jpeg)$/.test(path)) {
    return true;
  }
  return false;
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // If the path is public, no action is needed.
  if (isPublic(path)) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  // If user is not logged in, redirect them to the login page.
  if (!isLoggedIn) {
    // Prevent redirect loops for the login page itself.
    if (path !== '/login') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect_to', path); // Remember where the user was going.
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // If user is logged in...
  
  // but their profile is not complete...
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
  // Match all paths except for specific static files.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

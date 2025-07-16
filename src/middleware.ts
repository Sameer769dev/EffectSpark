
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
  return false;
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow all requests for static files, images, and API routes to pass through.
  if (path.startsWith('/_next') || path.startsWith('/static') || path.startsWith('/api/') || /\.(png|ico|webmanifest|svg|jpg)$/.test(path)) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  const isPublicPage = isPublic(path);

  // If user is not logged in and trying to access a protected page
  if (!isLoggedIn && !isPublicPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Preserve the original destination to redirect after login
    url.searchParams.set('redirect_to', path);
    return NextResponse.redirect(url);
  }

  // If user is logged in
  if (isLoggedIn) {
    // and profile is not complete, force profile creation
    if (!profileComplete) {
      if (path !== '/profile/create') {
        return NextResponse.redirect(new URL('/profile/create', request.url));
      }
    } 
    // if profile is complete
    else {
      // prevent them from accessing login or profile creation pages.
      if (path === '/login' || path === '/profile/create') {
        return NextResponse.redirect(new URL('/generator', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for the ones that are likely static assets.
  matcher: '/((?!_next/image|favicon.ico).*)',
};

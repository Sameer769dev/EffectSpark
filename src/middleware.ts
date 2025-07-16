
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Ignore Next.js internal paths, static files, and all API routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api/') ||
    path.includes('.') // This catches files like favicon.ico, manifest.webmanifest etc.
  ) {
    return NextResponse.next();
  }

  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  const isPublicPath = path === '/' || path === '/login' || path.startsWith('/shared-idea');

  // If on a public path, allow access
  if (isPublicPath) {
    // But if a logged-in user tries to access /login, redirect to generator
    if (isLoggedIn && path.startsWith('/login')) {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
    return NextResponse.next();
  }

  // From here, all paths are protected
  // If user is not logged in, redirect them to the login page
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
  } else {
    // If their profile IS complete, but they are trying to access profile creation,
    // redirect them to the main app page.
    if (path === '/profile/create') {
      return NextResponse.redirect(new URL('/generator', request.url));
    }
  }

  // If none of the above conditions are met, the user is authenticated and authorized.
  return NextResponse.next();
}

// This config ensures the middleware runs on all paths except for static assets.
export const config = {
  matcher: ['/((?!_next/static|favicon.ico|manifest.webmanifest).*)'],
};

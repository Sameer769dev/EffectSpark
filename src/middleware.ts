
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

const isPublicPage = (pathname: string) => {
  return publicPages.includes(pathname);
}

const isApiRoute = (pathname: string) => {
  return pathname.startsWith('/api/');
}

const isStaticAsset = (pathname: string) => {
  return pathname.startsWith('/_next/') || pathname.startsWith('/static/') || /\.(png|ico|webmanifest)$/.test(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public pages, API routes, and static files without checking session
  if (isPublicPage(pathname) || isApiRoute(pathname) || isStaticAsset(pathname)) {
    // Exception: if a logged-in user tries to visit the login page, redirect them.
    if (pathname === '/login') {
      const session = await getIronSession(cookies(), sessionOptions);
      if (session.isLoggedIn) {
        const redirectPath = session.profileComplete ? '/generator' : '/profile/create';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }
    return NextResponse.next();
  }

  // For all other pages, we require a valid session.
  const session = await getIronSession(cookies(), sessionOptions);
  const { isLoggedIn, profileComplete } = session;

  if (!isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(url);
  }
  
  if (!profileComplete) {
    if (pathname !== '/profile/create') {
      const url = request.nextUrl.clone();
      url.pathname = '/profile/create';
      return NextResponse.redirect(url);
    }
  } else { // profile is complete
    if (pathname === '/profile/create') {
       const url = request.nextUrl.clone();
       url.pathname = '/generator';
       return NextResponse.redirect(url);
    }
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
     */
    '/((?!_next/image|favicon.ico).*)',
  ],
};

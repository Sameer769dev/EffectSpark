import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session';

export async function GET(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
  return NextResponse.redirect(new URL('/profile', request.url));
}

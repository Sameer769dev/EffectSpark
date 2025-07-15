import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export async function GET() {
  const csrfState = randomBytes(16).toString('hex');
  const cookieStore = cookies();
  cookieStore.set('csrfState', csrfState, { 
    maxAge: 60000, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  const
    TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
  const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI;

  if (!TIKTOK_CLIENT_KEY || !REDIRECT_URI) {
    return NextResponse.json({ error: 'TikTok client key or redirect URI not configured.' }, { status: 500 });
  }

  let url = 'https://www.tiktok.com/v2/auth/authorize/';

  const params = new URLSearchParams({
    client_key: TIKTOK_CLIENT_KEY,
    scope: 'user.info.basic',
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: csrfState,
  });

  url += `?${params.toString()}`;

  return NextResponse.redirect(url);
}

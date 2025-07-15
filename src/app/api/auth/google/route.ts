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

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

  if (!GOOGLE_CLIENT_ID || !REDIRECT_URI) {
    console.error('Google client ID or redirect URI not configured.');
    return NextResponse.json({ error: 'Google client ID or redirect URI not configured.' }, { status: 500 });
  }

  let url = 'https://accounts.google.com/o/oauth2/v2/auth';

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    state: csrfState,
    access_type: 'offline',
    prompt: 'consent',
  });

  url += `?${params.toString()}`;

  return NextResponse.redirect(url);
}

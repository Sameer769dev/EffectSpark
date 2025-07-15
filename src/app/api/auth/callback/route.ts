import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { IronSession, getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const storedState = cookieStore.get('csrfState')?.value;
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  if (state !== storedState || !code) {
    return NextResponse.json({ error: 'State mismatch or no code provided.' }, { status: 400 });
  }

  // Clear the CSRF state cookie
  cookieStore.delete('csrfState');

  const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
  const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
  const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI;

  if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET || !REDIRECT_URI) {
    return NextResponse.json({ error: 'TikTok app credentials or redirect URI not configured.' }, { status: 500 });
  }

  try {
    const tokenUrl = 'https://open.tiktokapis.com/v2/oauth/token/';
    const body = new URLSearchParams({
        client_key: TIKTOK_CLIENT_KEY,
        client_secret: TIKTOK_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('TikTok API Error:', data);
        return NextResponse.json({ error: 'Failed to fetch access token', details: data }, { status: 500 });
    }

    const session = await getIronSession(cookies(), sessionOptions);
    session.accessToken = data.access_token;
    session.refreshToken = data.refresh_token;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (error) {
    console.error('Error during token exchange:', error);
    return NextResponse.json({ error: 'Internal server error during token exchange.' }, { status: 500 });
  }
}

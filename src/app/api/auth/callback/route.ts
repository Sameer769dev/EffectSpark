
'use server';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
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

  cookieStore.delete('csrfState');

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !APP_URL) {
    console.error('Google app credentials or App URL not configured.');
    return NextResponse.json({ error: 'Google app credentials or App URL not configured.' }, { status: 500 });
  }
  
  const redirectUri = `${APP_URL}/api/auth/callback`;

  try {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const body = new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Google API Error during token exchange:', data);
        return NextResponse.json({ error: 'Failed to fetch access token', details: data }, { status: 500 });
    }

    const session = await getIronSession(cookies(), sessionOptions);
    session.accessToken = data.access_token;
    session.refreshToken = data.refresh_token;
    session.isLoggedIn = true;
    
    // For a new login, profile is not yet complete.
    // The middleware will handle redirecting to /profile/create
    session.profileComplete = session.profileComplete || false;
    
    await session.save();
    
    const redirectPath = session.profileComplete ? '/generator' : '/profile/create';

    return NextResponse.redirect(new URL(redirectPath, request.url));

  } catch (error) {
    console.error('Error during token exchange:', error);
    return NextResponse.json({ error: 'Internal server error during token exchange.' }, { status: 500 });
  }
}

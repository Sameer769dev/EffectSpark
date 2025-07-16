
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
    console.error('State mismatch or no code provided.');
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
    
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
        console.error('Google API Error during token exchange:', tokenData);
        return NextResponse.json({ error: 'Failed to fetch access token', details: tokenData }, { status: 500 });
    }

    // Now fetch user info
    const userinfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const userinfoResponse = await fetch(userinfoUrl, {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userinfoResponse.json();

    if (userInfo.error) {
        console.error('Google User Info API Error:', userInfo.error_description);
        return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
    }

    const session = await getIronSession(cookies(), sessionOptions);
    
    session.isLoggedIn = true;
    session.accessToken = tokenData.access_token;
    session.refreshToken = tokenData.refresh_token;
    
    // Check if the user already has a profile in our system (e.g., from a database)
    // For this example, we'll assume a new login requires profile setup unless session says otherwise.
    // A robust implementation would query a DB with userInfo.sub or userInfo.email
    
    // We store basic Google info in the session to create the profile page
    session.userProfile = {
      ...(session.userProfile || {}), // Preserve existing app-specific profile data if any
      avatar_url: userInfo.picture,
      display_name: userInfo.name,
      username: userInfo.email,
    };
    
    // If profileComplete is not explicitly true, it's considered incomplete.
    session.profileComplete = session.userProfile?.creatorStyle && session.userProfile?.displayName ? true : false;
    
    await session.save();
    
    const redirectPath = session.profileComplete ? '/generator' : '/profile/create';
    return NextResponse.redirect(new URL(redirectPath, request.url));

  } catch (error) {
    console.error('Error during authentication flow:', error);
    return NextResponse.json({ error: 'Internal server error during authentication.' }, { status: 500 });
  }
}

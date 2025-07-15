import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn || !session.accessToken) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    const userinfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

    const response = await fetch(userinfoUrl, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();

    if (data.error) {
        console.error('Google User Info API Error:', data.error_description);
        // A common error is an expired token.
        // A more robust implementation would use the refresh token here.
        // For now, we'll just log the user out.
        session.destroy();
        return NextResponse.json({ isLoggedIn: false, error: 'Access token invalid' }, { status: 401 });
    }

    // Map Google's `picture` to `avatar_url` and `name` to `display_name` to match our app's convention
    const googleProfile = {
      avatar_url: data.picture,
      display_name: data.name,
      username: data.email, // Use email as a stable username
    };

    // Combine Google user data with our app's profile data from the session
    const fullProfile = {
      ...googleProfile,
      ...session.userProfile,
    };

    return NextResponse.json({ 
        user: fullProfile, 
        isLoggedIn: true,
        profileComplete: session.profileComplete 
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error fetching profile.' }, { status: 500 });
  }
}
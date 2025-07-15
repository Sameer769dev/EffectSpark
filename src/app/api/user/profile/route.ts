
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
    const userinfoUrl = new URL('https://open.tiktokapis.com/v2/user/info/');
    userinfoUrl.searchParams.append('fields', 'open_id,union_id,avatar_url,display_name,username');

    const response = await fetch(userinfoUrl.href, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();

    if (data.error.code !== 'ok') {
        console.error('TikTok User Info API Error:', data.error);
        return NextResponse.json({ error: 'Failed to fetch user info', details: data.error.message }, { status: 500 });
    }

    // Combine TikTok user data with our app's profile data from the session
    const fullProfile = {
      ...data.data.user,
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

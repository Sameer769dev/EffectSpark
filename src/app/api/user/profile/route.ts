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

    return NextResponse.json({ user: data.data.user });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error fetching profile.' }, { status: 500 });
  }
}

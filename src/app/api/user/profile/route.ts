
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  // The full profile is stored in the session, so we can just return it.
  const fullProfile = {
      ...session.userProfile,
      display_name: session.userProfile?.display_name,
      avatar_url: session.userProfile?.avatar_url,
      username: session.userProfile?.username,
  };

  return NextResponse.json({ 
      user: fullProfile, 
      isLoggedIn: true,
      profileComplete: session.profileComplete 
  });
}

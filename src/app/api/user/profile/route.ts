
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  // If access token has expired, a robust app would use the refresh token here.
  // For this example, we just check if the session exists.

  // The full profile is now stored in the session, so we can just return it.
  // This avoids making a new call to Google on every page load.
  const fullProfile = {
      ...session.userProfile,
      // Ensure display_name and avatar_url are consistent for the client
      display_name: session.userProfile?.displayName || session.userProfile?.display_name,
      avatar_url: session.userProfile?.avatar_url,
      username: session.userProfile?.username,
  };

  return NextResponse.json({ 
      user: fullProfile, 
      isLoggedIn: true,
      profileComplete: session.profileComplete 
  });
}

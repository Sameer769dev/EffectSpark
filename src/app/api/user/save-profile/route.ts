
import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session';

export async function POST(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const { displayName, creatorStyle, interests } = await request.json();

  session.userProfile = {
    // Keep existing google info
    ...session.userProfile,
    // Add app-specific info
    display_name: displayName,
    creatorStyle,
    interests,
  };
  session.profileComplete = true;
  await session.save();

  return NextResponse.json({ success: true });
}

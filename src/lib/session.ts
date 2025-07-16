
import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'effectspark-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// This is the shape of the data that will be stored in the session.
// We need to declare this to extend the IronSessionData interface.
declare module 'iron-session' {
  interface IronSessionData {
    isLoggedIn?: boolean;
    accessToken?: string;
    refreshToken?: string;
    profileComplete?: boolean;
    userProfile?: {
      displayName: string;
      creatorStyle: string;
      interests: string;
      // Adding Google profile info directly here for consistency
      avatar_url?: string;
      username?: string; // This will store the email
    };
  }
}

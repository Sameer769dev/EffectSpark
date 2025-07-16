
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
      avatar_url?: string;
      display_name?: string;
      username?: string; // This will store the email
      creatorStyle?: string;
      interests?: string;
    };
  }
}

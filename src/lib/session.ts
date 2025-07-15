
import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'effectspark-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// This is the shape of the data that will be stored in the session.
type AppSession = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  profileComplete?: boolean;
  userProfile?: {
    displayName: string;
    creatorStyle: string;
    interests: string;
  };
};

declare module 'iron-session' {
  interface IronSessionData extends AppSession {}
}

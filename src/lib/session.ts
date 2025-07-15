import type { IronSessionOptions } from 'iron-session';
import { type User } from '@/types';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'effectspark-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    isLoggedIn?: boolean;
    accessToken?: string;
    refreshToken?: string;
  }
}

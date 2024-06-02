import NextAuth from 'next-auth';
import 'next-auth/jwt';

import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import volueIdentity from './volue-provider';

const config = {
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  providers: [volueIdentity],
  basePath: '/api/frontend/auth',
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth);
    },
    jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpiresAt: account.expires_at,
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    session({ session, token }) {
      if (token?.accessToken && token?.accessTokenExpiresAt) {
        // eslint-disable-next-line no-param-reassign
        session.accessToken = token.accessToken;
        // eslint-disable-next-line no-param-reassign
        session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      }
      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== 'production' ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    accessTokenExpiresAt?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpiresAt?: number;
  }
}

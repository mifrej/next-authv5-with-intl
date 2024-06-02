import type { Provider } from 'next-auth/providers';

const volueIdentity: Provider = {
  account(account) {
    return {
      accessToken: account.access_token,
      accessTokenExpires: account.expires_at,
    };
  },
  allowDangerousEmailAccountLinking: true,
  authorization: { params: { scope: 'openid vi.admin.api:users email' } },
  checks: ['pkce', 'state'],
  clientId: '447877cd-cf5a-4f47-8d7f-332d028597ad_TestAtuh',
  clientSecret: process.env.VOLUE_OAUTH_CLIENT_SECRET,
  id: 'volue-identity',
  issuer: 'https://auth.identity.volue.com',
  name: 'Volue Identity',
  profile(profile) {
    return {
      accessToken: profile.accessToken,
      email: profile.email,
      expiresAt: profile.expiresAt,
      id: '447877cd-cf5a-4f47-8d7f-332d028597ad_TestAtuh',
      name: 'Volue Identity',
    };
  },
  // style: {
  //   brandColor: `${colors['--primary']}`,
  //   logo: '/favicons/apple-touch-icon.png',
  // },
  type: 'oidc',
  wellKnown: 'https://auth.identity.volue.com/.well-known/openid-configuration',
};

export default volueIdentity;

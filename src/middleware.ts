import { createMiddleware } from 'next-easy-middlewares';
import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './navigation';
import { localAppMiddleware } from './middlewares/local-app-redirect';
import { authMiddleware } from './middlewares/auth-middleware';
import { isDevelopment } from 'utils/utils.mjs';

const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  localePrefix: 'always',
  locales,
});

const productionMiddlewares = [authMiddleware, intlMiddleware];

const middlewares = {
  '/:path*': isDevelopment
    ? [localAppMiddleware, ...productionMiddlewares]
    : productionMiddlewares,
};

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: [
    '/((?!api/|_next/|_static|_vercel|favicons|fonts|[\\w-]+\\.\\w+).*)',
  ],
};

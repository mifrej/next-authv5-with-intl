import type { CustomMiddleware } from 'next-easy-middlewares';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from 'src/navigation';

/**
 *
 * @description Middleware to redirect to the inner app in local development.
 */
const localAppMiddleware: CustomMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const [, locale, ...segments] = url.pathname.split('/');

  const appNameSegment =
    process.env.APP_NAME && !segments.includes(process.env.APP_NAME)
      ? `/${process.env.APP_NAME}`
      : '';

  const localeSegment =
    locale && locales.includes(locale as 'en' | 'pl' | 'de')
      ? `/${locale}`
      : '';

  const innerSegments = segments.length > 0 ? `/${segments.join('/')}` : '';

  if (!segments.includes(process.env.APP_NAME as string)) {
    url.pathname = `${localeSegment}${appNameSegment}${innerSegments}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export { localAppMiddleware };

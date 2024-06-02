import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { LOCALES, SIGN_IN_ROUTE } from 'config/constants.mjs';
import { NextResponse } from 'next/server';

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  if (!pathName) {
    return false;
  }
  const regexTest = new RegExp(
    `^(/(${[...LOCALES].join('|')}))?(${pages.flatMap((page) => (page === '/' ? ['', '/'] : page)).join('|')})/?$`,
    'i',
  ).test(pathName);
  console.log(
    'pages: ',
    pages.join(),
    'pathName: ',
    pathName,
    'regexTest: ',
    regexTest,
  );

  return regexTest;
};
// end of testPathnameRegex

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: 'en',
});

const authMiddleware = auth((req) => {
  console.log('in auth middleware');
  console.log('=====================================');
  const isSignInPage = testPathnameRegex([SIGN_IN_ROUTE], req.nextUrl.pathname);
  const session = req.auth;
  console.log(' ');
  console.log(
    '<<<<<<<<<<<<<<<<< session:',
    session,
    'session >>>>>>>>>>>>>>>>>>>',
  );
  console.log(' ');

  // Redirect to sign-in page if not authenticated
  if (!session && !isSignInPage) {
    return NextResponse.redirect(new URL(SIGN_IN_ROUTE, req.nextUrl));
  }

  // Redirect to home page if authenticated and trying to access signin page
  if (session && isSignInPage) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }

  return intlMiddleware(req);
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    // '/(pl|en)/:path*',
  ],
};

export default authMiddleware;

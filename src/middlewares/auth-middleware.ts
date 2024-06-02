import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getLogger } from 'utils/log-server-esm.mjs';

const isLogsVerbose = process.env.LOGS_VERBOSE === 'true';
const nodeLogger = getLogger('debug');

/**
 *
 * @description Middleware to check if the user is authenticated.
 */
const authMiddleware = auth((request) => {
  const session = request.auth;
  if (isLogsVerbose) {
    nodeLogger.debug({ 'authMiddleware session': session });
  }
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/frontend/auth/signin`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export { authMiddleware };

import { randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { type NextRequest, userAgent } from 'next/server';
import type { app_user, Prisma } from '@/src/generated/prisma/client';
import { prisma } from '@/src/lib/prisma';

/**
 * Create a session record, pass `session_id` to client using `set-cookie` header
 */
export default async function createSession(
  request: NextRequest,
  user: app_user,
) {
  const session_id = randomBytes(512).toString('hex');
  const userAgentInfo = userAgent(request);
  const { browser, os, device } = userAgentInfo;

  const sessionCreateInput: Prisma.sessionCreateInput = {
    session_id,
    app_user: {
      connect: {
        id: user.id,
      },
    },
    browser: browser.name,
    browser_version: browser.version,
    os: os.name,
    platform: device.type || 'desktop',
    ip: (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0],
  };

  await prisma.session.create({
    data: sessionCreateInput,
  });

  const cookieStore = await cookies();
  cookieStore.set('session_id', session_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // only https in prod, allows http in dev
    sameSite: 'strict',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days - match session's default expired_at
  });
}

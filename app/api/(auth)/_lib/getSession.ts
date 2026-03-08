import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { cookies } from 'next/headers';
import { prisma } from '@/src/lib/prisma';

dayjs.extend(isSameOrBefore);

/**
 *
 * @returns `{ session: Session, error: null }` or `{ session: null, error: string }`
 */
export default async function getSession() {
  const cookieStore = cookies();
  const session_id = (await cookieStore).get('session_id')?.value;
  if (!session_id) {
    return { session: null, error: 'Not logged in' };
  }

  const session = await prisma.session.findUnique({
    where: {
      session_id,
    },
    include: {
      app_user: {
        omit: {
          password: true,
        },
      },
    },
  });

  if (!session) {
    return { session: null, error: 'Session not found in DB' };
  }

  const now = dayjs();
  const expiredAt = dayjs(session.expired_at);
  const isExpired = expiredAt.isSameOrBefore(now);

  if (isExpired) {
    return { session: null, error: 'Session expired' };
  }

  return { session, error: null };
}

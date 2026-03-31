import { cookies } from 'next/headers';
import type { sessionGetPayload } from '@/src/generated/prisma/models';
import { dayjsExt } from '@/src/lib/dayjs';
import { prisma } from '@/src/lib/prisma';

type SessionResult =
  | {
      session: sessionGetPayload<{
        include: {
          app_user: {
            omit: {
              password: true;
            };
            include: {
              profilePic: true;
            };
          };
        };
      }>;
      error: null;
    }
  | {
      session: null;
      error: 'Not logged in' | 'Session not found in DB' | 'Session expired';
    };

/**
 *
 * @returns `{ session: Session, error: null }` or `{ session: null, error: string }`
 */
export default async function getSession(): Promise<SessionResult> {
  const cookieStore = await cookies();
  const session_id = cookieStore.get('session_id')?.value;
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
        include: {
          profilePic: true,
        },
      },
    },
  });

  if (!session) {
    return { session: null, error: 'Session not found in DB' };
  }

  const now = dayjsExt();
  const expiredAt = dayjsExt(session.expired_at);
  const isExpired = expiredAt.isSameOrBefore(now);

  if (isExpired) {
    return { session: null, error: 'Session expired' };
  }

  return { session, error: null };
}

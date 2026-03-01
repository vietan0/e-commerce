import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

dayjs.extend(isSameOrBefore);
export async function GET() {
  try {
    const cookieStore = cookies();
    const session_id = (await cookieStore).get('session_id')?.value;
    if (!session_id)
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

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
      return NextResponse.json(
        { error: 'session_id not found' },
        { status: 401 },
      );
    }

    const now = dayjs();
    const expiredAt = dayjs(session.expired_at);
    const isExpired = expiredAt.isSameOrBefore(now);

    if (isExpired) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    return NextResponse.json({ user: session.app_user });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

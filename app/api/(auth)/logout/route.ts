import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST() {
  try {
    // 1. update session record's expired_at
    const cookieStore = await cookies();
    const sessionIdCookie = cookieStore.get('session_id');
    if (!sessionIdCookie) {
      // not logged in to begin with
      return new NextResponse(null, { status: 401 });
    }

    const _session = await prisma.session.update({
      where: {
        session_id: sessionIdCookie.value,
      },
      data: {
        expired_at: new Date(),
      },
    });

    // 2. delete cookie
    cookieStore.delete('session_id');
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { prisma } from '@/src/lib/prisma';
import uploadFiles from '@/src/lib/uploadFiles';

export async function PATCH(req: NextRequest) {
  try {
    const { session, error } = await getSession();
    if (error) throw new Error(error);

    const [file] = await uploadFiles(req);
    const user = await prisma.app_user.update({
      where: {
        id: session.app_user.id,
      },
      data: {
        profile_pic: file.id,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

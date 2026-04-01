import { type NextRequest, NextResponse } from 'next/server';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';
import uploadFiles from '@/src/lib/uploadFiles';

export async function PATCH(req: NextRequest) {
  try {
    const user_id = await getUserId();
    const [file] = await uploadFiles(req);
    const user = await prisma.app_user.update({
      where: {
        id: user_id,
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

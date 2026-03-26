import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const sessionResult = await getSession();
    return NextResponse.json(
      { app_user: sessionResult.session!.app_user },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sessionResult = await getSession();
    const body = await req.json();

    const user = await prisma.app_user.update({
      where: {
        id: sessionResult.session!.app_user.id,
      },
      data: body,
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

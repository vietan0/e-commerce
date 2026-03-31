import { NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { orderInclude } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const { session } = await getSession();
    const orders = await prisma.order.findMany({
      where: {
        user_id: session!.app_user.id,
      },
      include: orderInclude,
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

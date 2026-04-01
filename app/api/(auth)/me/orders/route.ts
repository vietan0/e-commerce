import { NextResponse } from 'next/server';
import { orderInclude } from '@/src/lib/commonIncludes';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const user_id = await getUserId();
    const orders = await prisma.order.findMany({
      where: { user_id },
      include: orderInclude,
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

import { type NextRequest, NextResponse } from 'next/server';
import { orderInclude } from '@/src/lib/commonIncludes';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user_id = await getUserId();
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: {
        id: +id,
        user_id,
      },
      include: orderInclude,
    });

    if (!order)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

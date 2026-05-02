import { type NextRequest, NextResponse } from 'next/server';
import { orderInclude } from '@/src/lib/commonIncludes';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const { searchParams } = url;
  const status_code = searchParams.get('status_code');
  try {
    const user_id = await getUserId();
    const orders = await prisma.order.findMany({
      where: {
        user_id,
        order_status: { code: status_code || undefined },
      },
      orderBy: {
        created_at: 'desc',
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

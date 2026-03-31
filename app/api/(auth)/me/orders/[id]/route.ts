import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { includeDiscount } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { session } = await getSession();
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: {
        id: BigInt(id),
        user_id: session!.app_user.id,
      },
      include: {
        delivery_type: true,
        order_product: {
          include: {
            product: {
              include: includeDiscount,
            },
          },
        },
        order_status: true,
        payment_method: true,
        payment_status: true,
        store: true,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

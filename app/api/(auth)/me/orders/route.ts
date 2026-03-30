import { NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { includeDiscount } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const { session } = await getSession();
    const orders = await prisma.order.findMany({
      where: {
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

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

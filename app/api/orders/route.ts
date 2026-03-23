import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  /* 
    user_id, // get from session
    order_status_id, // fetch and set default
    payment_status_id, // fetch and set default
    total_value, // the rest from body
    delivery_type_id,
    store_id?,
    shipping_address?,
    note?,
  */

  try {
    const body = await req.json();
    const { session } = await getSession();

    const [pendingOrderStatus, pendingPaymentStatus] = await Promise.all([
      prisma.order_status.findUnique({
        where: { code: 'pending' },
      }),
      prisma.payment_status.findUnique({
        where: { code: 'pending' },
      }),
    ]);

    if (!pendingOrderStatus || !pendingPaymentStatus) {
      return NextResponse.json(
        { error: 'Default statuses not configured' },
        { status: 500 },
      );
    }

    const order = await prisma.order.create({
      data: {
        ...body,
        user_id: session!.app_user.id,
        order_status_id: pendingOrderStatus.id,
        payment_status_id: pendingPaymentStatus.id,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

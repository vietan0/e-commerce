import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import getCartItems from '@/src/lib/getCartItems';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  /* 
    1. create record in order
    user_id, // get from session
    order_status_id, // fetch and set default
    payment_status_id, // fetch and set default
    total_value, // calc from cart_items
    delivery_type_id, // the rest from body
    payment_method_id
    store_id?,
    shipping_address?,
    note?,

    2. create records in order_product
    needs: 
      order_id from step 1,
      product_id from cart_item, --> query prisma
      quantity from cart_item,
      unit_price from cart_item,
      line_total - calculated by quantity * unit_price
  */

  try {
    const body = await req.json();
    const { session } = await getSession();

    const [pendingOrderStatus, pendingPaymentStatus] = await Promise.all([
      prisma.order_status.findUnique({
        where: { code: 'PENDING' },
      }),
      prisma.payment_status.findUnique({
        where: { code: 'PENDING' },
      }),
    ]);

    if (!pendingOrderStatus || !pendingPaymentStatus) {
      return NextResponse.json(
        { error: 'Default statuses not configured' },
        { status: 500 },
      );
    }

    const cart_items = await getCartItems();
    const order = await prisma.order.create({
      data: {
        // total_value: body.total_value,
        // shipping_address: body.shipping_address,
        // note: body.note,
        // store_id: body.store_id,
        // payment_method_id: body.payment_method_id,
        // delivery_type_id: body.delivery_type_id,
        ...body,
        user_id: session!.app_user.id,
        order_status_id: pendingOrderStatus.id,
        payment_status_id: pendingPaymentStatus.id,
        order_product: {
          create: cart_items.map((cart_item) => ({
            product_id: cart_item.product_id,
            quantity: cart_item.quantity,
            /* @ts-expect-error */
            unit_price: cart_item.product.final_price,
            /* @ts-expect-error */
            line_total: cart_item.product.final_price * cart_item.quantity,
          })),
        },
      },
      include: {
        order_product: true,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

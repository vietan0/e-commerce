import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { calcLineTotal, calcOrderValues } from '@/app/api/orders/orderCalc';
import sendEmail from '@/app/api/send-email/sendEmail';
import type { orderUncheckedCreateInput } from '@/src/generated/prisma/models';
import { orderInclude } from '@/src/lib/commonIncludes';
import { omitEmpty } from '@/src/lib/empty';
import getCartItems from '@/src/lib/getCartItems';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  /* 
    1. create record in order
    user_id, // get from session
    order_status_id, // fetch and set default
    payment_status_id, // fetch and set default
    shipping_fee, // calc from delivery_type_id
    subtotal, // calc from cart_items
    total_value, // calc from cart_items
    delivery_type_id, // the rest from body
    payment_method_id
    store_id?,
    shipping_address?,
    note?,

    2. create records in order_product
    needs: 
      order_id from step 1,
      product_id from cart_item --> query prisma
      quantity from cart_item,
      unit_price from cart_item,
      line_total - calculated by quantity * unit_price
  
    3. clean out cart
  */

  try {
    const body = await req.json();
    const cleanBody = omitEmpty(body);
    const { session } = await getSession();

    const [pendingOrderStatus, pendingPaymentStatus, deliveryType] =
      await Promise.all([
        prisma.order_status.findUnique({
          where: { code: 'PENDING' },
        }),
        prisma.payment_status.findUnique({
          where: { code: 'PENDING' },
        }),
        prisma.delivery_type.findUnique({
          where: {
            id: body.delivery_type_id,
          },
        }),
      ]);

    if (!pendingOrderStatus || !pendingPaymentStatus || !deliveryType) {
      return NextResponse.json(
        { error: 'Error while fetch data to prepare prisma.create' },
        { status: 500 },
      );
    }

    const cart_items = await getCartItems();

    const { subtotal, total_value } = calcOrderValues(
      cart_items,
      Number(deliveryType.shipping_fee),
    );

    /* 
      body may contain both store_id and shipping_address,
      use deliveryType to ignore one
    */
    const deliveryFieldMap: Record<
      string,
      Partial<orderUncheckedCreateInput>
    > = {
      HOME_DELIVERY: { shipping_address: cleanBody.shipping_address },
      STORE_PICKUP: { store_id: cleanBody.store_id },
    };

    const deliveryValues: Partial<orderUncheckedCreateInput> = {
      delivery_type_id: cleanBody.delivery_type_id,
      ...deliveryFieldMap[deliveryType.code],
    };

    const createOrderPromise = prisma.order.create({
      data: {
        ...deliveryValues,
        payment_method_id: cleanBody.payment_method_id,
        delivery_type_id: cleanBody.delivery_type_id,
        note: cleanBody.note,
        shipping_fee: deliveryType.shipping_fee,
        subtotal,
        total_value,
        user_id: session!.app_user.id,
        order_status_id: pendingOrderStatus.id,
        payment_status_id: pendingPaymentStatus.id,
        order_product: {
          create: cart_items.map((cart_item) => ({
            product_id: cart_item.product_id,
            quantity: cart_item.quantity,
            /* @ts-expect-error */
            unit_price: cart_item.product.final_price,
            line_total: calcLineTotal(cart_item),
          })),
        },
      },
      include: orderInclude,
    });

    const emptyCartPromise = prisma.cart_item.deleteMany({
      where: {
        user_id: session!.app_user.id,
      },
    });

    const [order, _cart] = await prisma.$transaction([
      createOrderPromise,
      emptyCartPromise,
    ]);

    await sendEmail({
      templateName: 'OrderPlaced',
      templateProps: { order },
      subject: `Thông báo đơn hàng #${order.code} của quý khách đã được tiếp nhận`,
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

import { type NextRequest, NextResponse } from 'next/server';
import { createTranslator } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { calcLineTotal, calcOrderValues } from '@/app/api/orders/orderCalc';
import sendEmail from '@/app/api/send-email/sendEmail';
import type { orderUncheckedCreateInput } from '@/src/generated/prisma/models';
import { orderInclude } from '@/src/lib/commonIncludes';
import { omitEmpty } from '@/src/lib/empty';
import getCartItems from '@/src/lib/getCartItems';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const { searchParams } = url;
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    let take: number | undefined;
    let skip: number | undefined;
    if (limit) {
      take = Number(limit);
      if (page) skip = (Number(page) - 1) * take;
    }

    let orderByObj = {};
    if (sort) {
      const sortColMatches = sort.match(/\w+$/);
      if (sortColMatches) {
        const [sortCol] = sortColMatches;
        const sortDir = sort.startsWith('-') ? 'desc' : 'asc';
        orderByObj = { [sortCol]: sortDir };
      }
    }
    const totalRowCount = await prisma.order.count();
    const orders = await prisma.order.findMany({
      take,
      skip,
      orderBy: [orderByObj],
      include: orderInclude,
    });

    const res = {
      rowCount: orders.length,
      totalRowCount,
      orders,
    };

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  /* 
    1. create record in order
      user_id, // get from session
      order_status_id, // fetch and set default
      payment_status_id, // fetch and set default
      shipping_fee, // calc from delivery_type_id
      subtotal, // calc from cart_items
      total_value, // calc from cart_items
      user_name // record, calc from user_id
      user_email // record, calc from user_id
      user_phone // record, calc from user_id
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
      final_unit_price from cart_item
      line_total - calculated by quantity * unit_price
  
    3. clean out cart
  */

  try {
    const body = await req.json();
    const cleanBody = omitEmpty(body);
    const user_id = await getUserId();

    const [
      paymentMethod,
      awaitingPaymentOrderStatus,
      preparingOrderStatus,
      pendingPaymentStatus,
      deliveryType,
      user,
    ] = await Promise.all([
      prisma.payment_method.findUnique({
        where: { id: cleanBody.payment_method_id },
      }),
      prisma.order_status.findUnique({
        where: { code: 'AWAITING_PAYMENT' },
      }),
      prisma.order_status.findUnique({
        where: { code: 'PREPARING' },
      }),
      prisma.payment_status.findUnique({
        where: { code: 'PENDING' },
      }),
      prisma.delivery_type.findUnique({
        where: {
          id: body.delivery_type_id,
        },
      }),
      prisma.app_user.findUnique({
        where: {
          id: user_id,
        },
      }),
    ]);

    if (
      !paymentMethod ||
      !awaitingPaymentOrderStatus ||
      !preparingOrderStatus ||
      !pendingPaymentStatus ||
      !deliveryType ||
      !user
    ) {
      return NextResponse.json(
        { error: 'Error while fetch data to prepare prisma.create' },
        { status: 500 },
      );
    }

    if (!user.name || !user.phone) {
      return NextResponse.json(
        { error: 'User info: name, phone required' },
        { status: 500 },
      );
    }

    const cart_items = await getCartItems();

    const { subtotal, total_value } = calcOrderValues(
      cart_items,
      Number(deliveryType.shipping_fee),
    );

    /* 
      initial order_status should depend on payment method
      - if CoD: pending (user hasn't given cash yet), delivery continues as usual
      - if bank: awaiting_payment, only resume delivery when payment_status becomes paid
    */
    const initialOrderStatus =
      paymentMethod.code === 'COD'
        ? preparingOrderStatus
        : awaitingPaymentOrderStatus;

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
        user_name: user.name,
        user_email: user.email,
        user_phone: user.phone,
        user_id,
        order_status_id: initialOrderStatus.id,
        payment_status_id: pendingPaymentStatus.id,
        order_product: {
          create: cart_items.map((cart_item) => ({
            product_id: cart_item.product_id,
            quantity: cart_item.quantity,
            base_price: cart_item.product.base_price,
            /* @ts-expect-error */
            unit_price: cart_item.product.final_price,
            line_total: calcLineTotal(cart_item),
            orderProductDiscounts: {
              create: cart_item.product.discount_product.map((dp) => ({
                discount_name: dp.discount.name,
                discount_value: dp.discount.value,
                discount_type_name: dp.discount.discount_type.name,
              })),
            },
          })),
        },
      },
      include: orderInclude,
    });

    const emptyCartPromise = prisma.cart_item.deleteMany({
      where: { user_id },
    });

    const [order, _cart] = await prisma.$transaction([
      createOrderPromise,
      emptyCartPromise,
    ]);

    const locale = await getLocale();

    const t = createTranslator({
      messages: await import(`@/messages/${locale}.json`),
      locale,
    });

    await sendEmail({
      templateName: 'OrderPlaced',
      templateProps: { order },
      subject: t('email.OrderPlaced.subject', { order_code: order.code }),
      locale,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

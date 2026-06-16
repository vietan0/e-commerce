import { type NextRequest, NextResponse } from 'next/server';
import getCartItems from '@/src/lib/getCartItems';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';
import type { UpsertCartItemBody } from '@/src/types/cart';

export async function GET() {
  try {
    const cart_items = await getCartItems();
    return NextResponse.json({ cart_items });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UpsertCartItemBody;
    const user_id = await getUserId();

    const cart_item = await prisma.cart_item.upsert({
      where: {
        product_id_user_id: {
          product_id: +body.productId,
          user_id,
        },
      },
      create: {
        user_id,
        product_id: +body.productId,
        quantity: body.quantity,
      },
      update: {
        quantity: {
          increment: body.quantity,
        },
      },
    });

    return NextResponse.json({ cart_item }, { status: 201 });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

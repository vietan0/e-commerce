import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { includeDiscount } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';
import type { UpsertCartItemBody } from '@/src/types/cart';

export async function GET() {
  try {
    const { session } = await getSession();

    const cart_items = await prisma.cart_item.findMany({
      where: {
        app_user: {
          id: session!.app_user.id,
        },
      },
      include: {
        product: {
          include: {
            ...includeDiscount,
            thumbnail: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

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
    const { session } = await getSession();

    const cart_item = await prisma.cart_item.upsert({
      where: {
        product_id_user_id: {
          product_id: BigInt(body.productId),
          user_id: session!.app_user.id,
        },
      },
      create: {
        user_id: session!.app_user.id,
        product_id: BigInt(body.productId),
        amount: body.amount,
      },
      update: {
        amount: {
          increment: body.amount,
        },
      },
    });

    return NextResponse.json({ cart_item });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

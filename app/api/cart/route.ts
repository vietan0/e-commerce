import { NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { includeDiscount } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';

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
    });

    return NextResponse.json({ cart_items });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

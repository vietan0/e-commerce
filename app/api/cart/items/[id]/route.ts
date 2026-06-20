import { type NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@/src/generated/prisma/client';
import { prisma } from '@/src/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = (await req.json()) as {
      action: 'increment' | 'decrement';
      quantity: number;
    };
    const { action, quantity } = body;
    const { id } = await params;

    const cart_item = await prisma.cart_item.findUnique({
      where: { id: +id },
    });

    if (!cart_item) {
      console.error(`No cart_item with id: ${id}`);
      return NextResponse.json(
        { error: `Cart item not found.` },
        { status: 400 },
      );
    }

    if (cart_item.quantity === 1 && action === 'decrement') {
      // delete, not update
      const deletedCartItem = await prisma.cart_item.delete({
        where: { id: +id },
      });

      return NextResponse.json({
        deleted: true,
        cart_item: deletedCartItem,
      });
    }

    const updateArgs: Prisma.cart_itemUpdateArgs = {
      where: {
        id: +id,
      },
      data: {
        quantity: {
          [action]: quantity,
        },
      },
    };

    const updatedCartItem = await prisma.cart_item.update(updateArgs);

    return NextResponse.json({
      deleted: false,
      cart_item: updatedCartItem,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deletedCartItem = await prisma.cart_item.delete({
      where: { id: +id },
    });

    return NextResponse.json({ deletedCartItem });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

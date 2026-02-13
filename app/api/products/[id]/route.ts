import { type NextRequest, NextResponse } from 'next/server';
import { calcPriceAfterDiscounts } from '@/lib/price';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: BigInt(id) },
      include: {
        manufacturer: true,
        product_image: true,
        discount_product: {
          include: {
            discount: {
              include: {
                discount_type: true,
              },
            },
          },
        },
        product_category: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: `Product with id = ${id} not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await params;
    // TODO: validate
    const updatedProduct = await prisma.product.update({
      where: {
        id: BigInt(id),
      },
      data: body,
    });
    return NextResponse.json({ body, updatedProduct });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

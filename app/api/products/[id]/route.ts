import { pick } from 'es-toolkit/object';
import { type NextRequest, NextResponse } from 'next/server';
import type { productUpdateInput } from '@/src/generated/prisma/models';
import { includeDiscount } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: BigInt(id) },
      include: {
        ...includeDiscount,
        manufacturer: true,
        product_image: {
          include: {
            file: true,
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
    console.error(error);
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
    // 1. get scalar fields
    const scalarBody = pick(body, [
      'name',
      'base_price',
      'description',
      'thumbnail',
      'stock',
    ]);

    const data: productUpdateInput = Object.fromEntries(
      Object.entries(scalarBody).filter(([_, value]) => value !== undefined),
    );

    // 2. append relation fields manually
    if (body.manufacturer_id) {
      data.manufacturer = {
        connect: {
          id: body.manufacturer_id,
        },
      };
    }

    if (body.categories) {
      // 'set' doesn't work because I defined these relations explicitly
      data.product_category = {
        deleteMany: {},
        createMany: {
          data: body.categories.map((c: string) => ({ category_id: c })),
        },
      };
    }

    // 3. update prisma
    const product = await prisma.product.update({
      where: {
        id: BigInt(id),
      },
      data,
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

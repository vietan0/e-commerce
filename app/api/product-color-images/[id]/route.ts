import { type NextRequest, NextResponse } from 'next/server';
import { includeColor } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updatedProductColorImage = await prisma.product_color_image.update({
      where: { id: +id },
      data: body,
      include: includeColor,
    });

    return NextResponse.json({ updatedProductColorImage });
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
    const deletedProductColorImage = await prisma.product_color_image.delete({
      where: { id: +id },
      include: includeColor,
    });

    return NextResponse.json({ deletedProductColorImage });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

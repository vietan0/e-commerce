import { type NextRequest, NextResponse } from 'next/server';
import { includeColor } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

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
    deletedProductColorImage.product_color?.product.id;

    return NextResponse.json({ deletedProductColorImage });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

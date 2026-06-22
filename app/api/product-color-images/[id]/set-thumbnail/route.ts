import { type NextRequest, NextResponse } from 'next/server';
import { includeColor } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const toggleOff = prisma.product_color_image.updateManyAndReturn({
      where: {
        product_color_id: body.product_color_id,
        id: { not: +id },
        is_thumbnail: true,
      },
      data: { is_thumbnail: false },
    });

    const toggleOn = prisma.product_color_image.update({
      where: { id: +id },
      data: { is_thumbnail: true },
      include: includeColor,
    });

    const result = await prisma.$transaction([toggleOff, toggleOn]);
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

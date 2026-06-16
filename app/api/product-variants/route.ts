import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const product_variants = await prisma.product_variant.findMany();
    const totalRowCount = await prisma.product_variant.count();

    return NextResponse.json({
      rowCount: product_variants.length,
      totalRowCount,
      rows: product_variants,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product_variant = await prisma.product_variant.create({
      data: body,
      include: {
        product_color: true,
      },
    });

    return NextResponse.json({ product_variant }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

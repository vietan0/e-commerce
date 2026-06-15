import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const productColors = await prisma.product_color.findMany();
    const totalRowCount = await prisma.product_color.count();

    return NextResponse.json({
      rowCount: productColors.length,
      totalRowCount,
      rows: productColors,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

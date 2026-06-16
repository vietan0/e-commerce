import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const product_colors = await prisma.product_color.findMany();
    const totalRowCount = await prisma.product_color.count();

    return NextResponse.json({
      rowCount: product_colors.length,
      totalRowCount,
      rows: product_colors,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

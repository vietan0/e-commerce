import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const product_series = await prisma.product_series.findMany();
    const totalRowCount = await prisma.product_series.count();

    return NextResponse.json({
      rowCount: product_series.length,
      totalRowCount,
      rows: product_series,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

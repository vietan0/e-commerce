import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const discount_products = await prisma.discount_product.findMany();
    const totalRowCount = await prisma.discount_product.count();

    return NextResponse.json({
      rowCount: discount_products.length,
      totalRowCount,
      rows: discount_products,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

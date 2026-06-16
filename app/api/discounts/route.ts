import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const discounts = await prisma.discount.findMany();
    const totalRowCount = await prisma.discount.count();

    return NextResponse.json({
      rowCount: discounts.length,
      totalRowCount,
      rows: discounts,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

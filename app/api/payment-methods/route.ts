import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const payment_methods = await prisma.payment_method.findMany({
      orderBy: { index: 'asc' },
    });
    const totalRowCount = await prisma.payment_method.count();

    return NextResponse.json({
      rowCount: payment_methods.length,
      totalRowCount,
      rows: payment_methods,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const delivery_types = await prisma.delivery_type.findMany();
    const totalRowCount = await prisma.delivery_type.count();

    return NextResponse.json({
      rowCount: delivery_types.length,
      totalRowCount,
      rows: delivery_types,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

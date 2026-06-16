import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    const totalRowCount = await prisma.store.count();

    return NextResponse.json({
      rowCount: stores.length,
      totalRowCount,
      rows: stores,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

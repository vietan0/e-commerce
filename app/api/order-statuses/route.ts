import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const order_statuses = await prisma.order_status.findMany({
      orderBy: {
        index: 'asc',
      },
    });
    return NextResponse.json({ order_statuses });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

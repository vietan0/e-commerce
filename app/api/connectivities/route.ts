import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const connectivities = await prisma.connectivity.findMany();
    const totalRowCount = await prisma.connectivity.count();

    return NextResponse.json({
      rowCount: connectivities.length,
      totalRowCount,
      rows: connectivities,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

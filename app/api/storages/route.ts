import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const storages = await prisma.storage.findMany();
    const totalRowCount = await prisma.storage.count();

    return NextResponse.json({
      rowCount: storages.length,
      totalRowCount,
      rows: storages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

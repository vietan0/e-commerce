import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const rams = await prisma.ram.findMany();
    const totalRowCount = await prisma.ram.count();

    return NextResponse.json({
      rowCount: rams.length,
      totalRowCount,
      rows: rams,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

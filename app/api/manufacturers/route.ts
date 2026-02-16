import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    const totalRowCount = await prisma.manufacturer.count();

    return NextResponse.json({
      rowCount: manufacturers.length,
      totalRowCount,
      manufacturers,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

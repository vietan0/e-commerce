import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();
    const totalRowCount = await prisma.brand.count();

    return NextResponse.json({
      rowCount: brands.length,
      totalRowCount,
      rows: brands,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

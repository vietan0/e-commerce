import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const totalRowCount = await prisma.category.count();

    return NextResponse.json({
      rowCount: categories.length,
      totalRowCount,
      categories,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

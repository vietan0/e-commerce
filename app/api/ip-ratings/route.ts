import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const ip_ratings = await prisma.ip_rating.findMany();
    const totalRowCount = await prisma.ip_rating.count();

    return NextResponse.json({
      rowCount: ip_ratings.length,
      totalRowCount,
      rows: ip_ratings,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

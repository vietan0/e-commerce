import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const charging_technologies = await prisma.charging_technology.findMany();
    const totalRowCount = await prisma.charging_technology.count();

    return NextResponse.json({
      rowCount: charging_technologies.length,
      totalRowCount,
      rows: charging_technologies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

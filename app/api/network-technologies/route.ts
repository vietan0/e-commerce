import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const network_technologies = await prisma.network_technology.findMany();
    const totalRowCount = await prisma.network_technology.count();

    return NextResponse.json({
      rowCount: network_technologies.length,
      totalRowCount,
      rows: network_technologies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

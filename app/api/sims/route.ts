import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const sims = await prisma.sim.findMany();
    const totalRowCount = await prisma.sim.count();

    return NextResponse.json({
      rowCount: sims.length,
      totalRowCount,
      rows: sims,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

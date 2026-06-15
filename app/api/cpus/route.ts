import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const cpus = await prisma.cpu.findMany();
    const totalRowCount = await prisma.cpu.count();

    return NextResponse.json({
      rowCount: cpus.length,
      totalRowCount,
      rows: cpus,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const gpus = await prisma.gpu.findMany();
    const totalRowCount = await prisma.gpu.count();

    return NextResponse.json({
      rowCount: gpus.length,
      totalRowCount,
      rows: gpus,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

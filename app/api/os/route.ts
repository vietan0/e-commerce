import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const os = await prisma.os.findMany();
    const totalRowCount = await prisma.os.count();

    return NextResponse.json({
      rowCount: os.length,
      totalRowCount,
      rows: os,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

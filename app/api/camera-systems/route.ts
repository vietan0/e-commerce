import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const camera_systems = await prisma.camera_system.findMany();
    const totalRowCount = await prisma.camera_system.count();

    return NextResponse.json({
      rowCount: camera_systems.length,
      totalRowCount,
      rows: camera_systems,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

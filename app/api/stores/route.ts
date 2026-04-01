import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    return NextResponse.json({ stores });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

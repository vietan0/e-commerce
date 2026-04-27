import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await params;
    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

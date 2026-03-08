import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST() {
  try {
    // TODO: protected route
    const unusedFiles = await prisma.file.findMany({
      where: {
        // add more props as new tables relates to table file (use Diagram in Datagrip to see)
        products: {
          none: {},
        },
        productImages: {
          none: {},
        },
        profilePic: {
          none: {},
        },
      },
    });

    if (unusedFiles.length === 0) {
      return NextResponse.json({ deletedCount: 0 });
    }

    // 1. delete from file table
    const deleted = await prisma.file.deleteMany({
      where: {
        id: {
          in: unusedFiles.map((f) => f.id),
        },
      },
    });

    // 2. delete from vercel blob
    await del(unusedFiles.map((f) => f.name));
    return NextResponse.json({ deletedCount: deleted.count });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

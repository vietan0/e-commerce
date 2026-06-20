import { type NextRequest, NextResponse } from 'next/server';
import { includeColor } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';
import uploadFiles from '@/src/lib/uploadFiles';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const product_color_id = Number(formData.get('product_color_id'));
    const files = formData.getAll('file') as File[];

    const fileRecords = await uploadFiles(files);
    const images = await prisma.product_color_image.createManyAndReturn({
      data: fileRecords.map((file) => ({ file_id: file.id, product_color_id })),
      include: includeColor,
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

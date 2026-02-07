import { put } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/api/utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await req.formData();
    const files = form.getAll('file') as File[];

    if (files.length === 1 && files[0].name === '' && files[0].size === 0) {
      return NextResponse.json({ error: 'No file selected' }, { status: 400 });
    }

    const promises = files.map((file) =>
      put(file.name, file, { access: 'public' }),
    );
    const imgBlobs = await Promise.all(promises);

    const rows = imgBlobs.map((blob) => ({
      product_id: id,
      url: blob.url,
    }));

    const product_images = await sql`
      insert into product_image ${sql(rows, 'product_id', 'url')} returning *
    `;
    return NextResponse.json({ product_images });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

import { put } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const files = form.getAll('file') as File[];

    if (files.length === 1 && files[0].name === '' && files[0].size === 0) {
      return NextResponse.json({ error: 'No file selected' }, { status: 400 });
    }

    const promises = files.map((file) =>
      put(file.name, file, { access: 'public' }),
    );
    const blobs = await Promise.all(promises);
    return NextResponse.json({ blobs });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

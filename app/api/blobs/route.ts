import { type ListBlobResultBlob, list } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const { searchParams } = url;
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    const listResult = await list({
      limit: limit ? Number(limit) : undefined,
    });
    const { blobs } = listResult;
    const sorted = blobs.sort((a, b) => {
      if (!sort) return 1;
      const sortColMatches = sort.match(/\w+$/);
      if (!sortColMatches) return 1;

      const sortCol = sortColMatches[0] as keyof ListBlobResultBlob;
      const sortDir = sort.startsWith('-') ? 'desc' : 'asc';
      if (sortCol === 'size') {
        return sortDir === 'asc' ? a.size - b.size : b.size - a.size;
      } else if (sortCol === 'uploadedAt') {
        return sortDir === 'asc'
          ? new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
          : new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      } else {
        return sortDir === 'asc'
          ? a[sortCol].localeCompare(b[sortCol])
          : b[sortCol].localeCompare(a[sortCol]);
      }
    });
    return NextResponse.json({ blobCount: sorted.length, blobs: sorted });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

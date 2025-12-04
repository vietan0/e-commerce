import { type NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/api/utils';

export async function GET() {
  const result = await sql`
    select * from product;
  `;
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      body,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

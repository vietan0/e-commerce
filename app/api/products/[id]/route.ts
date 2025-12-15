import { type NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/api/utils';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [product] = await sql`
      select * from product where product_id = ${id}
    `;

    if (!product) {
      return NextResponse.json(
        { error: `Product with product_id = ${id} not found` },
        { status: 404 },
      );
    }
    const productImages = await sql`
      select * from product_image where product_id = ${id}
    `;

    const productAllInfo = {
      ...product,
      images: productImages,
    };

    return NextResponse.json(productAllInfo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

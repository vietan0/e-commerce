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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await params;
    // TODO: validate
    const updatedProduct = await sql`
      update product set ${sql(body)} where product_id = ${id} returning *;
    `;
    return NextResponse.json({ body, updatedProduct });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [product] = await sql`
      delete from product where product_id = ${id} returning *;
    `;

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

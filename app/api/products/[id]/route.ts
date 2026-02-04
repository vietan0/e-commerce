import { type NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/api/utils';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [product] = await sql`
      select p.*,
        (case
          when dt.name = 'percentage' then p.base_price * (100 - d.value) / 100
          when dt.name = 'fixed_amount' then p.base_price - d.value
          else p.base_price
        end)::numeric(14, 3) as final_price,
        m.name  as manufacturer_name,
        d.name  as discount_name,
        d.value as discount_value,
        dt.name as discount_type_name
      from
        product p
          full join product_category pc
          on p.id = pc.product_id
          full join manufacturer m
          on m.id = p.manufacturer_id
          full join discount_product dp
          on p.id = dp.product_id
          full join discount d
          on dp.discount_id = d.id
          full join discount_type dt
          on d.type = dt.id
      where p.id = ${id}
    `;

    if (!product) {
      return NextResponse.json(
        { error: `Product with id = ${id} not found` },
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

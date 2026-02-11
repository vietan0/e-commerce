import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const { searchParams } = url;
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    let take: number | undefined;
    let skip: number | undefined;
    if (limit) {
      take = Number(limit);
      if (page) skip = (Number(page) - 1) * take;
    }

    let orderByObj = {};
    if (sort) {
      const sortColMatches = sort.match(/\w+$/);
      if (sortColMatches) {
        const [sortCol] = sortColMatches;
        const sortDir = sort.startsWith('-') ? 'desc' : 'asc';
        orderByObj = { [sortCol]: sortDir };
      }
    }

    const totalRowCount = await prisma.product.count();
    const products = await prisma.product.findMany({
      take,
      skip,
      orderBy: [orderByObj],
      include: {
        manufacturer: true,
        product_image: true,
        discount_product: {
          include: {
            discount: {
              include: {
                discount_type: true,
              },
            },
          },
        },
        product_category: {
          include: {
            category: true,
          },
        },
      },
    });
    // const products = await sql`
    //   select p.*,
    //     (case
    //       when dt.name = 'percentage' then p.base_price * (100 - d.value) / 100
    //       when dt.name = 'fixed_amount' then p.base_price - d.value
    //       else p.base_price
    //     end)::numeric(14, 3) as final_price,
    //     m.name  as manufacturer_name,
    //     d.name  as discount_name,
    //     d.value as discount_value,
    //     dt.name as discount_type_name
    //   from
    //     product p
    //       full join product_category pc
    //       on p.id = pc.product_id
    //       full join manufacturer m
    //       on m.id = p.manufacturer_id
    //       full join discount_product dp
    //       on p.id = dp.product_id
    //       full join discount d
    //       on dp.discount_id = d.id
    //       full join discount_type dt
    //       on d.type = dt.id
    //   order by p.id limit ${limit} offset ${limit * (page - 1)};
    // `;

    const res = {
      rowCount: products.length,
      totalRowCount,
      products,
    };

    return NextResponse.json(res);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

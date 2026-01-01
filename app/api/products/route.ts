import { type NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/api/utils';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const { href, origin, pathname, searchParams } = url;
    const pageParam = searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 1;
    const limit = 10;

    const [{ totalProducts }] = await sql`
      select count(*)::int as "totalProducts" from product;
    `;

    const totalPages =
      Math.floor(totalProducts / limit) + (totalProducts % limit);

    const products = await sql`
      select p.*,
        c.name,
        m.name
      from
        product p
          join product_category pc
          on p.id = pc.product_id
          join category c
          on c.id = pc.category_id
          join manufacturer m
          on m.id = p.manufacturer_id
      order by p.id limit ${limit} offset ${limit * (page - 1)};
    `;

    const links = {
      self: href,
      first: `${origin}${pathname}?page=1`,
      last: `${origin}${pathname}?page=${totalPages}`,
    } as Record<string, string>;

    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    if (prevPage && page <= totalPages) {
      links.prev = `${origin}${pathname}?page=${prevPage}`;
    }
    if (nextPage && page <= totalPages) {
      links.next = `${origin}${pathname}?page=${nextPage}`;
    }
    const res = {
      meta: {
        totalRows: products.length,
        totalProducts,
        totalPages,
        page,
      },
      links,
      products,
    };
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, description, thumbnail, stock, manufacturer_id } =
      body;

    const [product] = await sql`
      insert into product(name, price, description, thumbnail, stock, manufacturer_id)
      values(${name}, ${price}, ${description || null}, ${thumbnail || null}, ${stock}, ${manufacturer_id}) returning *
    `;

    return NextResponse.json(
      {
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

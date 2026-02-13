import { type NextRequest, NextResponse } from 'next/server';
import { calcPriceAfterDiscounts } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';

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

    const productsWithFinalPrice = products.map((product) => ({
      ...product,
      final_price: calcPriceAfterDiscounts(product),
    }));

    const res = {
      rowCount: products.length,
      totalRowCount,
      products: productsWithFinalPrice,
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

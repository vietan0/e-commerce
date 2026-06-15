import { omit, omitBy } from 'es-toolkit/object';
import { type NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@/src/generated/prisma/client';
import { productInclude } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
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
      include: productInclude,
    });

    const res = {
      rowCount: products.length,
      totalRowCount,
      products,
    };

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. get scalar fields
    const scalarBody = omit(body, ['categories']);
    const data = omitBy(
      scalarBody,
      (val) => val === '' || val === null || val === undefined,
    ) as Prisma.productUncheckedCreateInput;

    // 2. append relation fields manually
    if (body.categories.length > 0) {
      // 'set' doesn't work because I defined these relations explicitly
      data.product_category = {
        createMany: {
          data: body.categories.map((c: string) => ({ category_id: c })),
        },
      };
    }

    const product = await prisma.product.create({
      data,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

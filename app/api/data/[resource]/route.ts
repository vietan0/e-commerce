// @ts-nocheck
import { NextResponse } from 'next/server';
import { includes, resources } from '@/app/api/_utils/resources';
import { wrapErr } from '@/app/api/_utils/wrapErr';

export const GET = wrapErr(
  async (
    req,
    { params }: { params: Promise<{ resource: keyof typeof resources }> },
  ) => {
    const { resource } = await params;

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

    const totalRowCount = await resources[resource].count();
    const data = await resources[resource].findMany({
      take,
      skip,
      orderBy: [orderByObj],
      include: includes[resource],
    });

    return NextResponse.json({
      rowCount: data.length,
      totalRowCount,
      data,
    });
  },
);

export const POST = wrapErr(
  async (
    req,
    { params }: { params: Promise<{ resource: keyof typeof resources }> },
  ) => {
    const { resource } = await params;
    const body = await req.json();
    const data = await resources[resource].create({
      data: body,
      include: includes[resource],
    });

    return NextResponse.json(data);
  },
);

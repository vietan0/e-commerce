// @ts-nocheck
import { NextResponse } from 'next/server';
import { resources } from '@/app/api/_utils/resources';
import { NotFoundError, wrapErr } from '@/app/api/_utils/wrapErr';

export const GET = wrapErr(
  async (
    _req,
    {
      params,
    }: { params: Promise<{ resource: keyof typeof resources; id: string }> },
  ) => {
    const { resource, id } = await params;

    const data = await resources[resource].findUnique({
      where: { id: +id },
    });

    if (data === null)
      throw new NotFoundError(
        `Resource '${resource}' with id '${id}' does not exist.`,
      );
    return NextResponse.json(data);
  },
);

export const PATCH = wrapErr(
  async (
    req,
    {
      params,
    }: { params: Promise<{ resource: keyof typeof resources; id: string }> },
  ) => {
    const { resource, id } = await params;
    const body = await req.json();
    const data = await resources[resource].update({
      where: { id: +id },
      data: body,
    });

    return NextResponse.json(data);
  },
);

export const DELETE = wrapErr(
  async (
    _req,
    {
      params,
    }: { params: Promise<{ resource: keyof typeof resources; id: string }> },
  ) => {
    const { resource, id } = await params;
    const data = await resources[resource].delete({
      where: { id: +id },
    });

    return NextResponse.json(data);
  },
);

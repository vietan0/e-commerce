import { type NextRequest, NextResponse } from 'next/server';

export class NotFoundError extends Error {
  status = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
type RouteContext<T = Record<string, string>> = {
  params: Promise<T>;
};
type RouteHandler<T> = (
  req: NextRequest,
  ctx: RouteContext<T>,
) => Promise<Response> | Response;

export function wrapErr<T = Record<string, string>>(
  handler: RouteHandler<T>,
): RouteHandler<T> {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(error);
      const typedError = error as Error;
      return NextResponse.json({ error: typedError.message }, { status: 500 });
    }
  };
}

import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';

export async function proxy(request: NextRequest) {
  const sessionResult = await getSession();
  if (!sessionResult.session || !sessionResult.session.app_user.is_admin)
    // or redirect to a No Permission page?
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/admin/:path*', // matches /admin with 0 or more subpaths
};

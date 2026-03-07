import { type NextRequest, NextResponse } from 'next/server';
import checkSession from '@/app/api/(auth)/_lib/checkSession';

export async function proxy(request: NextRequest) {
  const checkSessionResult = await checkSession();
  if (
    !checkSessionResult.session ||
    !checkSessionResult.session.app_user.is_admin
  )
    // or redirect to a No Permission page?
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/admin/:path*', // matches /admin with 0 or more subpaths
};

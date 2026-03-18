import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { proxyPaths } from '@/src/lib/proxyPaths';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicOnlyPage = proxyPaths.publicOnlyPages.some(({ path }) =>
    path.startsWith(pathname),
  );
  const isProtectedPage = proxyPaths.protectedPages.some(({ path }) =>
    path.startsWith(pathname),
  );
  const isAdminProtectedPage = proxyPaths.adminProtectedPages.some(({ path }) =>
    path.startsWith(pathname),
  );
  const isProtectedApi = proxyPaths.protectedApis.some(({ path }) =>
    path.startsWith(pathname),
  );

  if (!isPublicOnlyPage && !isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const { session, error } = await getSession();

  if (isPublicOnlyPage) {
    if (session) {
      console.log(`Redirected by proxy - ${pathname}: public only page`);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isProtectedPage) {
    if (!session) {
      console.log(`Redirected by proxy - ${pathname}: protected page`);
      return NextResponse.redirect(
        new URL(`/login?returnTo=${pathname}`, request.url),
      );
    }
  }

  if (isAdminProtectedPage) {
    if (!session?.app_user.is_admin) {
      console.log(`Redirected by proxy - ${pathname}: admin protected page`);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isProtectedApi) {
    if (!session) {
      console.log(`Error thrown by proxy - ${pathname}: protected api`);
      return NextResponse.json({ error }, { status: 401 });
    }
  }
}

export const config = {
  // add manually, can't map from proxyPaths because of matcher pattern
  matcher: [
    '/login',
    '/register',
    '/cart',
    '/checkout',
    '/admin/:path*',
    '/api/me',
    '/api/cart',
  ],
};

import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { userIdHeader } from '@/src/lib/getUserId';
import { proxyPaths } from '@/src/lib/proxyPaths';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicOnlyPage = proxyPaths.publicOnlyPages.some(({ path }) =>
    pathname.startsWith(path),
  );
  const isProtectedPage = proxyPaths.protectedPages.some(({ path }) =>
    pathname.startsWith(path),
  );
  const isAdminProtectedPage = proxyPaths.adminProtectedPages.some(({ path }) =>
    pathname.startsWith(path),
  );
  const isProtectedApi = proxyPaths.protectedApis.some(({ path }) =>
    pathname.startsWith(path),
  );

  if (
    !isPublicOnlyPage &&
    !isProtectedPage &&
    !isAdminProtectedPage &&
    !isProtectedApi
  ) {
    return NextResponse.next();
  }

  const { session, error } = await getSession();

  if (isPublicOnlyPage) {
    if (session) {
      console.log(`Redirected by proxy - ${pathname}: public only page`);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (isProtectedPage) {
    if (session) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set(userIdHeader, session.app_user.id);

      if (isAdminProtectedPage) {
        if (session.app_user.is_admin) {
          if (pathname === '/admin') {
            return NextResponse.redirect(new URL('/admin/products', req.url));
          }

          return NextResponse.next({ request: { headers: requestHeaders } });
        } else {
          console.log(
            `Redirected by proxy - ${pathname}: admin protected page`,
          );
          return NextResponse.redirect(new URL('/', req.url));
        }
      } else return NextResponse.next({ request: { headers: requestHeaders } });
    } else {
      console.log(`Redirected by proxy - ${pathname}: protected page`);
      return NextResponse.redirect(
        new URL(`/login?returnTo=${pathname}`, req.url),
      );
    }
  }

  if (isProtectedApi) {
    if (session) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set(userIdHeader, session.app_user.id);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } else {
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
    '/me',
    '/admin/:path*',
    '/api/me/:path*',
    '/api/cart/:path*',
    '/api/orders',
  ],
};

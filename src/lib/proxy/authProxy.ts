import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { userIdHeader } from '@/src/lib/getUserId';
import { proxyPaths } from '@/src/lib/proxy/proxyPaths';

export default async function authProxy(req: NextRequest) {
  // first proxy, doesn't receive a res
  /* 
    https://nextjs.org/docs/app/api-reference/functions/next-response
    - The response object from NextResponse.next() is NOT the "response" to be sent to client, just a config object.
    - The response object from NextResponse.json() is sent to client.
  */
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

  return NextResponse.next();
}

import { type NextRequest, NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicOnlyPage = PUBLIC_ONLY_PAGES.some((pattern) =>
    pattern.startsWith(pathname),
  );
  const isProtectedPage = PROTECTED_PAGES.some((pattern) =>
    pattern.startsWith(pathname),
  );
  const isProtectedApi = PROTECTED_APIS.some((pattern) =>
    pattern.startsWith(pathname),
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
    if (!session?.app_user.is_admin) {
      console.log(`Redirected by proxy - ${pathname}: protected page`);
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

const PUBLIC_ONLY_PAGES = ['/login', '/register'];
const PROTECTED_PAGES = ['/admin'];
const PROTECTED_APIS = ['/api/me', '/api/cart'];

export const config = {
  // add manually, can't use consts above because of matcher pattern
  matcher: ['/login', '/register', '/admin/:path*', '/api/me', '/api/cart'],
};

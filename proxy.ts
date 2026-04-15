import type { NextRequest } from 'next/server';
import authProxy from '@/src/lib/proxy/authProxy';
import i18nProxy from '@/src/lib/proxy/i18nProxy';

export async function proxy(req: NextRequest) {
  const authRes = await authProxy(req);
  return i18nProxy(req, authRes);
}

export const config = {
  matcher:
    '/((?!_next/data|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};

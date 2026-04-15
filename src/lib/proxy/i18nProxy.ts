import type { NextRequest, NextResponse } from 'next/server';

export default function i18nProxy(req: NextRequest, res: NextResponse) {
  const locale = req.cookies.get('locale')?.value;

  if (!locale) {
    // create one if doesn't have one
    const acceptLanguage = req.headers.get('accept-language')?.slice(0, 5);
    res.cookies.set('locale', acceptLanguage || 'en-US');
  }
  return res;
}

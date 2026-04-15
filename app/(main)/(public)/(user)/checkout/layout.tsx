import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import type React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'cart' });

  return {
    title: t('Checkout'),
  };
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

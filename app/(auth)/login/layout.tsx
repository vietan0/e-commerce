import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('Login'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

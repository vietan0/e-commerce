import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import OrdersClient from '@/app/(main)/(public)/(user)/me/orders/OrdersClient';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'profile' });

  return {
    title: t('Order history'),
  };
}

export default function Orders() {
  return <OrdersClient />;
}

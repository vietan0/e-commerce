import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocale, getTranslations } from 'next-intl/server';
import OrderClient from '@/app/(main)/(public)/(user)/me/orders/[id]/OrderClient';
import { getUserOrder } from '@/src/queries/orders/useUserOrder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'common' });

  try {
    const { order } = await getUserOrder(id, {
      Cookie: cookieStore.toString(),
    });

    return {
      title: `${t('Order')} #${order.code}`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Order #code',
    };
  }
}
export default async function Order({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderClient id={id} />;
}

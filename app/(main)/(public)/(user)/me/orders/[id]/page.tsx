import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import OrderClient from '@/app/(main)/(public)/(user)/me/orders/[id]/OrderClient';
import { getUserOrder } from '@/src/queries/orders/useUserOrder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const { order } = await getUserOrder(id, {
      Cookie: cookieStore.toString(),
    });

    return {
      title: `Đơn hàng #${order.code} - CellphoneS`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'CellphoneS',
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

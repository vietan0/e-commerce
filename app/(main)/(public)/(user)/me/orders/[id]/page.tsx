import OrderClient from '@/app/(main)/(public)/(user)/me/orders/[id]/OrderClient';

export default async function Order({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderClient id={id} />;
}

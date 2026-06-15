import ProductClient from '@/app/(main)/admin/products/[id]/ProductClient';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductClient id={id} />;
}

import 'md-editor-rt/lib/preview.css';
import type { Metadata } from 'next';
import ProductClient from '@/app/(main)/(public)/product/[id]/ProductClient';
import { getProduct } from '@/src/queries/products/useProduct';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const { product } = await getProduct(id);

    return {
      title: `${product.name} - CellphoneS`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'CellphoneS',
    };
  }
}
export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* Render UI in an inner Client Component, so I can generateMetadata here in Server */
  const { id } = await params;
  return <ProductClient id={id} />;
}

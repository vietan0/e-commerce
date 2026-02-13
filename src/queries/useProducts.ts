import { useQuery } from '@tanstack/react-query';
import type { ProductsRes } from '@/src/types';

export default function useProducts() {
  return useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
}

async function getProducts() {
  const res = await fetch('/api/products');
  const data = (await res.json()) as ProductsRes;

  if ('error' in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
}

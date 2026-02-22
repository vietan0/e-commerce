import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { ProductsRes } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useProducts(query: Query = {}) {
  return useQuery({
    queryKey: ['getProducts', query],
    queryFn: () => getProducts(query),
    staleTime: 1000 * 60 * 5,
  });
}

async function getProducts(query: Query) {
  const data = await apiFetch<ProductsRes>('/products', { query });

  if ('error' in data) throw new Error(data.error);
  return data;
}

import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes, ProductFull } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useProducts(query: Query = {}) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts(query),
    select: (data) => data.rows,
    staleTime,
  });
}

async function getProducts(query: Query) {
  const data = await apiFetch<GetManyRes<ProductFull>>('/products', { query });

  if ('error' in data) throw new Error(data.error);
  return data;
}

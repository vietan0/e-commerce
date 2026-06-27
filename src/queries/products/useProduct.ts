import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetOneRes, ProductFull } from '@/src/types';

export default function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime,
  });
}

export async function getProduct(id: number) {
  const data = await apiFetch<GetOneRes<ProductFull>>(`data/products/${id}`);

  if ('error' in data) throw new Error(data.error);
  return data;
}

import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { ProductRes } from '@/src/types';

export default function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    select: (data) => data.product,
    staleTime,
  });
}

export async function getProduct(id: string) {
  const data = await apiFetch<ProductRes>(`/products/${id}`);

  if ('error' in data) throw new Error(data.error);
  return data;
}

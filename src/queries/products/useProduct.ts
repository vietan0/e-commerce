import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { ProductRes } from '@/src/types';

export default function useProduct(id: string) {
  return useQuery({
    queryKey: ['getProduct', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5,
  });
}

async function getProduct(id: string) {
  const data = await apiFetch<ProductRes>(`/products/${id}`);

  if ('error' in data) throw new Error(data.error);
  return data;
}

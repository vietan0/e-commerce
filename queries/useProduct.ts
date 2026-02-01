import { useQuery } from '@tanstack/react-query';
import type { ProductRes } from '@/app/types';

export default function useProduct(id: string) {
  return useQuery({
    queryKey: ['getProduct', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5,
  });
}

async function getProduct(id: string) {
  const res = await fetch(`/api/products/${id}`);
  const data = (await res.json()) as ProductRes;

  if ('error' in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
}

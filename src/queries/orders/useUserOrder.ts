import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { OrderCommon } from '@/src/types';

export default function useUserOrder(id: string) {
  return useQuery({
    queryKey: ['userOrder', id],
    queryFn: () => getUserOrder(id),
    staleTime: 1000 * 60 * 5,
  });
}

async function getUserOrder(id: string) {
  const data = await apiFetch<{ order: OrderCommon }>(`/me/orders/${id}`);
  return data;
}

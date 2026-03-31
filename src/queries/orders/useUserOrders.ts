import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { OrderCommon } from '@/src/types';

export default function useUserOrders() {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: getUserOrders,
    select: (data) => data.orders,
    staleTime: 1000 * 60 * 5,
  });
}

async function getUserOrders() {
  const data = await apiFetch<{ orders: OrderCommon[] }>('/me/orders');
  return data;
}

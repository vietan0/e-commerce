import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { OrderFull } from '@/src/types';

type Query = {
  status_code?: string;
};

export default function useUserOrders(query: Query = {}) {
  return useQuery({
    queryKey: ['userOrders', query],
    queryFn: () => getUserOrders(query),
    select: (data) => data.orders,
    staleTime,
  });
}

async function getUserOrders(query: Query) {
  const data = await apiFetch<{ orders: OrderFull[] }>('/me/orders', {
    query,
  });
  return data;
}

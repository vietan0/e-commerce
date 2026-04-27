import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { OrderCommon } from '@/src/types';

export default function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    select: (data) => data.orders,
    staleTime,
  });
}

async function getOrders() {
  const data = await apiFetch<{ orders: OrderCommon[] }>(
    '/orders?sort=-created_at',
  );
  return data;
}

import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes, OrderFull } from '@/src/types';

export default function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    select: (data) => data.rows,
    staleTime,
  });
}

async function getOrders() {
  const data = await apiFetch<GetManyRes<OrderFull>>(
    '/orders?sort=-created_at',
  );

  if ('error' in data) throw new Error(data.error);
  return data;
}

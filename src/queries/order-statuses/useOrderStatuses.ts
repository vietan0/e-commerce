import { useQuery } from '@tanstack/react-query';
import type { order_status } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';

export default function useOrderStatuses() {
  return useQuery({
    queryKey: ['order_statuses'],
    queryFn: () => getOrderStatuses(),
    select: (data) => data.order_statuses,
    staleTime,
  });
}

async function getOrderStatuses() {
  const data = await apiFetch<{ order_statuses: order_status[] }>(
    '/order-statuses',
  );

  return data;
}

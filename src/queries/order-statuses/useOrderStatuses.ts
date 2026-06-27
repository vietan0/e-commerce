import { useQuery } from '@tanstack/react-query';
import type { order_status } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes } from '@/src/types';

export default function useOrderStatuses() {
  return useQuery({
    queryKey: ['order_statuses'],
    queryFn: () => getOrderStatuses(),
    select: ({ data }) => data,
    staleTime,
  });
}

async function getOrderStatuses() {
  const data = await apiFetch<GetManyRes<order_status>>('/order-statuses');

  if ('error' in data) throw new Error(data.error);
  return data;
}

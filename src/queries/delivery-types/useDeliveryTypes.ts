import { useQuery } from '@tanstack/react-query';
import type { delivery_type } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes } from '@/src/types';

export default function useDeliveryTypes() {
  return useQuery({
    queryKey: ['delivery_types'],
    queryFn: getDeliveryTypes,
    select: ({ data }) => data,
    staleTime,
  });
}

async function getDeliveryTypes() {
  const data = await apiFetch<GetManyRes<delivery_type>>('/delivery-types');

  if ('error' in data) throw new Error(data.error);
  return data;
}

import { useQuery } from '@tanstack/react-query';
import type { delivery_type } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';

export default function useDeliveryTypes() {
  return useQuery({
    queryKey: ['delivery_types'],
    queryFn: getDeliveryTypes,
    select: (data) => data.delivery_types,
    staleTime: 1000 * 60 * 5,
  });
}

async function getDeliveryTypes() {
  const data = await apiFetch<{ delivery_types: delivery_type[] }>(
    '/delivery-types',
  );

  return data;
}

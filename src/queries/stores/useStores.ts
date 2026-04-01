import { useQuery } from '@tanstack/react-query';
import type { store } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';

export default function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    select: (data) => data.stores,
    staleTime,
  });
}

async function getStores() {
  const data = await apiFetch<{ stores: store[] }>('/stores');
  return data;
}

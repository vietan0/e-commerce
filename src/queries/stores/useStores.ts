import { useQuery } from '@tanstack/react-query';
import type { store } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';

export default function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    select: (data) => data.stores,
    staleTime: 1000 * 60 * 5,
  });
}

async function getStores() {
  const data = await apiFetch<{ stores: store[] }>('/stores');
  return data;
}

import { useQuery } from '@tanstack/react-query';
import type { store } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes } from '@/src/types';

export default function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    select: ({ data }) => data,
    staleTime,
  });
}

async function getStores() {
  const data = await apiFetch<GetManyRes<store>>('/data/stores');

  if ('error' in data) throw new Error(data.error);
  return data;
}

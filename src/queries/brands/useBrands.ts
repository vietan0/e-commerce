import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { DataRes, EndpointMap } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useBrands(query: Query = {}) {
  return useQuery({
    queryKey: ['brands', query],
    queryFn: () => getBrands(query),
    select: (data) => data.rows,
    staleTime,
  });
}

async function getBrands(query: Query) {
  const data = await apiFetch<DataRes<EndpointMap['brands']>>('/brands', {
    query,
  });

  if ('error' in data) throw new Error(data.error);
  return data;
}

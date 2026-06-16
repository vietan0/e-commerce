import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { EndpointMap, GetManyRes } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useEndpoint<K extends keyof EndpointMap>(
  endpoint: K,
  query: Query = {},
) {
  return useQuery({
    queryKey: [endpoint, query],
    queryFn: () => getData(endpoint, query),
    select: (data) => data.rows,
    staleTime,
  }) as ReturnType<typeof useQuery<EndpointMap[K][]>>;
}

async function getData(endpoint: keyof EndpointMap, query: Query) {
  const data = await apiFetch<GetManyRes<EndpointMap[typeof endpoint]>>(
    `/${endpoint}`,
    {
      query,
    },
  );

  if ('error' in data) throw new Error(data.error);
  return data;
}

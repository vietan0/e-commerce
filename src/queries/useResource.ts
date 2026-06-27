import { useQuery } from '@tanstack/react-query';
import { isEmptyObject } from 'es-toolkit';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes, ResourceMap } from '@/src/types';

type Query = {
  sort?: string;
  page?: number;
  limit?: number;
};

export default function useResource<K extends keyof ResourceMap>(
  resource: K,
  query: Query = {},
) {
  const queryKey = isEmptyObject(query) ? [resource] : [resource, query];

  return useQuery({
    queryKey,
    queryFn: () => getData(resource, query),
    select: ({ data }) => data,
    staleTime,
  }) as ReturnType<typeof useQuery<ResourceMap[K][]>>;
}

async function getData(resource: keyof ResourceMap, query: Query) {
  const data = await apiFetch<GetManyRes<ResourceMap[keyof ResourceMap]>>(
    `/data/${resource}`,
    { query },
  );

  if ('error' in data) throw new Error(data.error);
  return data;
}

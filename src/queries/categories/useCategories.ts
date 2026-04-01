import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { CategoriesRes } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useCategories(query: Query = {}) {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: () => getCategories(query),
    select: (data) => data.categories,
    staleTime,
  });
}

async function getCategories(query: Query) {
  const data = await apiFetch<CategoriesRes>('/categories', { query });

  if ('error' in data) throw new Error(data.error);
  return data;
}

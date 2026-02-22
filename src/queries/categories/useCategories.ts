import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { CategoriesRes } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useCategories(query: Query = {}) {
  return useQuery({
    queryKey: ['getCategories', query],
    queryFn: () => getCategories(query),
    staleTime: 1000 * 60 * 5,
  });
}

async function getCategories(query: Query) {
  const data = await apiFetch<CategoriesRes>('/categories', { query });

  if ('error' in data) throw new Error(data.error);
  return data;
}

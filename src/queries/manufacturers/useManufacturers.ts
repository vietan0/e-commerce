import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { ManufacturersRes } from '@/src/types';

type Query = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useManufacturers(query: Query = {}) {
  return useQuery({
    queryKey: ['getManufacturers', query],
    queryFn: () => getManufacturers(query),
    staleTime: 1000 * 60 * 5,
  });
}

async function getManufacturers(query: Query) {
  const data = await apiFetch<ManufacturersRes>('/manufacturers', {
    query,
  });

  if ('error' in data) throw new Error(data.error);
  return data;
}

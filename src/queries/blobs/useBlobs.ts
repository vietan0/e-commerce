import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import type { BlobsRes } from '@/src/types';

type Query = {
  limit?: number;
  sort?: string;
};

export default function useBlobs(query: Query = {}) {
  return useQuery({
    queryKey: ['getBlobs', query],
    queryFn: () => getBlobs(query),
    staleTime: 1000 * 60 * 5,
  });
}

async function getBlobs(query: Query) {
  const data = await apiFetch<BlobsRes>('/blobs', { query });

  if ('error' in data) throw new Error(data.error);
  return data;
}

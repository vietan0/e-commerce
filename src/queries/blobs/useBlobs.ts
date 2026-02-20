import { useQuery } from '@tanstack/react-query';
import type { BlobsRes } from '@/src/types';

type Options = {
  limit?: number;
  sort?: string;
};

export default function useBlobs(options: Options = {}) {
  return useQuery({
    queryKey: ['getBlobs', options],
    queryFn: () => getBlobs(options),
    staleTime: 1000 * 60 * 5,
  });
}

function buildQueryParams(options: Options) {
  let queryParams = '';
  const entries = Object.entries(options);

  if (entries.length > 0) {
    queryParams = '?';

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      queryParams += `${key}=${value}`;
      if (i < entries.length - 1) queryParams += '&';
    }
  }

  return queryParams;
}

async function getBlobs(options: Options) {
  const queryParams = buildQueryParams(options);
  const res = await fetch(`/api/blobs${queryParams}`);
  const data = (await res.json()) as BlobsRes;

  if ('error' in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
}

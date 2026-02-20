import { useQuery } from '@tanstack/react-query';
import type { ManufacturersRes } from '@/src/types';

type Options = {
  page?: number;
  limit?: number;
  sort?: string;
};

export default function useManufacturers(options: Options = {}) {
  return useQuery({
    queryKey: ['getManufacturers', options],
    queryFn: () => getManufacturers(options),
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

async function getManufacturers(options: Options) {
  const queryParams = buildQueryParams(options);
  const res = await fetch(`/api/manufacturers${queryParams}`);
  const data = (await res.json()) as ManufacturersRes;

  if ('error' in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
}

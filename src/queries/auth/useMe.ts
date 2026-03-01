import { useQuery } from '@tanstack/react-query';
import { FetchError } from 'ofetch';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';

export default function useMe() {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: () => getMe(),
    staleTime: 1000 * 60 * 5,
  });
}

async function getMe() {
  try {
    const data = await apiFetch<{
      user: app_userGetPayload<{ omit: { password: true } }>;
    }>('/me');

    return data;
  } catch (error) {
    if (error instanceof FetchError && error.status === 401) {
      // not logged in
      return null;
    }
    throw error;
  }
}

import { useQuery } from '@tanstack/react-query';
import { FetchError } from 'ofetch';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';

export default function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    // shouldn't use select because queryFn returns { app_user } | null
    staleTime: 1000 * 60 * 5,
  });
}

/**
 *
 * @param headers pass cookies manually if called from server
 */
export async function getMe(headers?: HeadersInit) {
  try {
    const data = await apiFetch<{
      app_user: app_userGetPayload<{
        omit: { password: true };
        include: { profilePic: true };
      }>;
    }>('/me', { headers });

    return data;
  } catch (error) {
    if (error instanceof FetchError && error.status === 401) {
      // not logged in
      return null;
    }
    throw error;
  }
}

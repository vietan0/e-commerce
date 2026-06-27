import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { ResourceMap } from '@/src/types';

export default function useCreateResource<K extends keyof ResourceMap>(
  resource: K,
  invalidateKeys: unknown[][] = [],
) {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: [`create-${resource}`],
    mutationFn: (data: object) => createResource(resource, data),
    onSuccess: async () => {
      displaySnackbar({ content: t('Resource created') });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [resource] }),
        ...invalidateKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      ]);
    },
  });
}

async function createResource(resource: keyof ResourceMap, data: object) {
  const createRes = await apiFetch(`/data/${resource}`, {
    method: 'POST',
    body: data,
  });

  return createRes;
}

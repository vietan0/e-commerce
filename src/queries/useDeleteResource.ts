import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { ResourceMap } from '@/src/types';

export default function useDeleteResource<K extends keyof ResourceMap>(
  resource: K,
  invalidateKeys: unknown[][] = [],
) {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: [`delete-${resource}`],
    mutationFn: (id: number) => deleteResource(resource, id),
    onSuccess: async () => {
      displaySnackbar({ content: t('Resource deleted') });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [resource] }),
        ...invalidateKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      ]);
    },
  });
}

async function deleteResource(resource: keyof ResourceMap, id: number) {
  const deleteRes = await apiFetch(`/data/${resource}/${id}`, {
    method: 'DELETE',
  });

  return deleteRes;
}

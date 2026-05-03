import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type UserFields = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (body: UserFields) => updateUser(body),
    onSuccess: () => {
      displaySnackbar({ content: t('Profile updated') });
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });
}

async function updateUser(body: UserFields) {
  const res = await apiFetch('/me', {
    method: 'PATCH',
    body,
  });

  return res;
}

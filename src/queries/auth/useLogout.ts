import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useReturnTo from '@/src/hooks/useReturnTo';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const returnTo = useReturnTo();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      displaySnackbar(t('Logged out successfully'));
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push(`/login?returnTo=${returnTo}`);
    },
  });
}

async function logout() {
  const res = await apiFetch<null>('/logout', {
    method: 'POST',
  });

  return res;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useUpdateProfilePic() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (formData: FormData) => updateProfilePic(formData),
    onSuccess: () => {
      displaySnackbar(t('Profile picture updated'));
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });
}

async function updateProfilePic(formData: FormData) {
  const res = await apiFetch('/me/profile-pic', {
    method: 'PATCH',
    body: formData,
  });

  return res;
}

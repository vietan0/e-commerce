import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      router.push('/login');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      displaySnackbar('Logged out successfully.');
    },
  });
}

async function logout() {
  const res = await apiFetch<null>('/logout', {
    method: 'POST',
  });

  return res;
}

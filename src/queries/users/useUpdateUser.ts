import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type UserFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (body: UserFields) => updateUser(body),
    onSuccess: () => {
      displaySnackbar('User updated.');
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

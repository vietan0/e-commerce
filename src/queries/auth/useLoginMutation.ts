import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type Credentials = {
  email: string;
  password: string;
};

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationFn: (body: Credentials) => login(body),
    onSuccess: async ({ user }) => {
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
      displaySnackbar(`Logged in as ${user.email}.`);
    },
  });
}

async function login(body: Credentials) {
  const res = await apiFetch<{
    user: app_userGetPayload<{ omit: { password: true } }>;
  }>('/login', {
    method: 'POST',
    body,
  });

  return res;
}

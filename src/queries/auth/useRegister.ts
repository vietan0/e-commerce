import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type Credentials = {
  email: string;
  password: string;
};

export default function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (body: Credentials) => register(body),
    onSuccess: async ({ user }) => {
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      displaySnackbar(`Logged in as ${user.email}.`);
    },
  });
}

async function register(body: Credentials) {
  const res = await apiFetch<{
    user: app_userGetPayload<{ omit: { password: true } }>;
  }>('/register', {
    method: 'POST',
    body,
  });

  return res;
}

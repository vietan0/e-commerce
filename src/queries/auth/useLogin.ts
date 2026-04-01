import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type Credentials = {
  email: string;
  password: string;
};

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (body: Credentials) => login(body),
    onSuccess: async ({ user }) => {
      displaySnackbar(`Logged in as ${user.email}.`);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push(returnTo || '/');
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

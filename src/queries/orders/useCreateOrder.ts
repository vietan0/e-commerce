import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { OrderFields } from '@/app/(main)/(public)/(user)/checkout/page';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { OrderCommon } from '@/src/types';

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (body: OrderFields) => createOrder(body),
    onSuccess: async ({ order }) => {
      displaySnackbar(t('Order created'));
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.push(`/me/orders/${order.id}`);
    },
  });
}

async function createOrder(body: OrderFields) {
  const res = await apiFetch<{ order: OrderCommon }>('/orders', {
    method: 'POST',
    body,
  });

  return res;
}

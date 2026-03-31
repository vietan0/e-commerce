import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { OrderFields } from '@/app/(main)/(public)/(user)/checkout/page';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { OrderCommon } from '@/src/types';

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (body: OrderFields) => createOrder(body),
    onSuccess: ({ order }) => {
      displaySnackbar('Order created.');
      queryClient.invalidateQueries({
        queryKey: ['orders', 'cart'],
      });
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

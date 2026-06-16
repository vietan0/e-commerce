import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { order, Prisma } from '@/src/generated/prisma/client';
import type { prisma } from '@/src/lib/prisma';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type UpdateOrderParams = {
  data: Prisma.Args<typeof prisma.order, 'update'>['data'];
  id: order['id'];
};

export default function useUpdateOrder() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: (updateOrderParams: UpdateOrderParams) =>
      updateOrder(updateOrderParams),
    onSuccess: async ({ order }) => {
      displaySnackbar({ content: t('Order updated') });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({
          queryKey: ['userOrder', order.id],
        }),
      ]);
    },
  });
}

async function updateOrder({ data, id }: UpdateOrderParams) {
  const updateRes = await apiFetch(`/orders/${id}`, {
    method: 'PATCH',
    body: data,
  });

  return updateRes;
}

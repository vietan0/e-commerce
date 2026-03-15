import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { cart_item } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';

type UpdateCartItemParams = {
  id: cart_item['id'];
  action: 'increment' | 'decrement';
};

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateCartItemParams: UpdateCartItemParams) =>
      updateCartItem(updateCartItemParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCart'] });
    },
  });
}

async function updateCartItem({ id, action }: UpdateCartItemParams) {
  const res = await apiFetch(`/cart/items/${id}`, {
    method: 'PATCH',
    body: { action },
  });

  return res;
}

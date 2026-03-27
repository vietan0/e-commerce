import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { cart_item } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';

type UpdateCartItemParams = {
  id: cart_item['id'];
  action: 'increment' | 'decrement';
  quantity: number;
};

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateCartItem'],
    mutationFn: (updateCartItemParams: UpdateCartItemParams) =>
      updateCartItem(updateCartItemParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

async function updateCartItem({ id, action, quantity }: UpdateCartItemParams) {
  const res = await apiFetch(`/cart/items/${id}`, {
    method: 'PATCH',
    body: { action, quantity },
  });

  return res;
}

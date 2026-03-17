import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

async function deleteCartItem(id: string) {
  const res = await apiFetch(`/cart/items/${id}`, { method: 'DELETE' });
  return res;
}

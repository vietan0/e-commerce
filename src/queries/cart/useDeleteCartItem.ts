import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      displaySnackbar('Đã xoá sản phẩm khỏi giỏ hàng.');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

async function deleteCartItem(id: string) {
  const res = await apiFetch(`/cart/items/${id}`, { method: 'DELETE' });
  return res;
}

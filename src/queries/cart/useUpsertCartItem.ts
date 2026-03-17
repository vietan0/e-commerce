import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { UpsertCartItemBody } from '@/src/types/cart';

export default function useUpsertCartItem() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);

  return useMutation({
    mutationKey: ['upsertCartItem'],
    mutationFn: (upsertCartItemBody: UpsertCartItemBody) =>
      upsertCartItem(upsertCartItemBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      displaySnackbar('Đã thêm sản phẩm vào giỏ hàng.');
    },
  });
}

async function upsertCartItem(upsertCartItemBody: UpsertCartItemBody) {
  const res = await apiFetch('/cart', {
    method: 'POST',
    body: upsertCartItemBody,
  });

  return res;
}

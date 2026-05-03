import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      displaySnackbar({ content: t('Removed product from cart') });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

async function deleteCartItem(id: string) {
  const res = await apiFetch(`/cart/items/${id}`, { method: 'DELETE' });
  return res;
}

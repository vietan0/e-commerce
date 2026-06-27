import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useDeleteProductColorImage() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['deleteProductColorImage'],
    mutationFn: (id: string) => deleteProductColorImage(id),
    onSuccess: async (deletedProductColorImage) => {
      displaySnackbar({ content: t('Product image deleted') });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'product',
            deletedProductColorImage.product_color.product_id.toString(),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            'productColorImages',
            deletedProductColorImage.product_color_id.toString(),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: ['productVariants' /* all variants? */],
        }),
      ]);
    },
    onError: (error) => {
      displaySnackbar({ content: error.message, severity: 'error' });
    },
  });
}

async function deleteProductColorImage(id: string) {
  const deleteRes = await apiFetch(`/data/product-color-images/${id}`, {
    method: 'DELETE',
  });

  return deleteRes;
}

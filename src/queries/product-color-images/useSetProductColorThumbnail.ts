import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useSetProductColorThumbnail() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['setProductColorImage'],
    mutationFn: ({
      id,
      product_color_id,
    }: {
      id: string;
      product_color_id: number;
    }) => setProductColorThumbnail(id, product_color_id),
    onSuccess: async ({ result }) => {
      const thumbnailProductColorImage = result[1];
      displaySnackbar({ content: t('Product image set as thumbnail') });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'product',
            thumbnailProductColorImage.product_color.product_id.toString(),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            'productColorImages',
            thumbnailProductColorImage.product_color_id.toString(),
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

async function setProductColorThumbnail(id: string, product_color_id: number) {
  // const res = await apiFetch('/');
  const res = await apiFetch(`/product-color-images/${id}/set-thumbnail`, {
    method: 'POST',
    body: {
      product_color_id,
    },
  });

  return res;
}

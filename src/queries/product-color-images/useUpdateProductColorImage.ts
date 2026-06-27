import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { product_color_imageUpdateInput } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useUpdateProductColorImage() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['updateProductColorImage'],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: product_color_imageUpdateInput;
    }) => updateProductColorImage(id, data),
    onSuccess: async (updatedProductColorImage) => {
      displaySnackbar({ content: t('Product image updated') });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'product',
            updatedProductColorImage.product_color.product_id.toString(),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            'productColorImages',
            updatedProductColorImage.product_color_id.toString(),
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

async function updateProductColorImage(
  id: string,
  data: product_color_imageUpdateInput,
) {
  const updateRes = await apiFetch(`/data/product-color-images/${id}`, {
    method: 'PATCH',
    body: data,
  });

  return updateRes;
}

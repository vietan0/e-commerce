import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useCreateProductColorImages() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['createProductColorImages'],
    mutationFn: (formData: FormData) => createProductColorImages(formData),
    onSuccess: async ({ images }) => {
      displaySnackbar({ content: t('Product images added') });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['product', images[0].product_color.product.id.toString()],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            'productColorImages',
            images[0].product_color.id.toString(),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: ['productVariants' /* all variants? */],
        }),
      ]);
    },
  });
}

async function createProductColorImages(formData: FormData) {
  const createRes = await apiFetch('/product-color-images/upload', {
    method: 'POST',
    body: formData,
  });

  return createRes;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

export default function useDeleteProductVariant() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['deleteProductVariant'],
    mutationFn: (id: string) => deleteVariant(id),
    onSuccess: async (product_variant) => {
      displaySnackbar({ content: t('Product variant deleted') });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({
          queryKey: [
            'product',
            product_variant.product_color.product_id.toString(),
          ],
        }),
      ]);
    },
  });
}

async function deleteVariant(id: string) {
  const data = await apiFetch(`data/product-variants/${id}`, {
    method: 'DELETE',
  });

  return data;
}

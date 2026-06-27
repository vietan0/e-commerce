import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { Prisma } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type CreateProductVariantParams = {
  data: Prisma.product_variantUncheckedCreateInput;
};

export default function useCreateProductVariant() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['createProductVariant'],
    mutationFn: (createProductVariantParams: CreateProductVariantParams) =>
      createVariant(createProductVariantParams),
    onSuccess: async ({ product_variant }) => {
      displaySnackbar({ content: t('Product variant created') });
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

async function createVariant({ data }: CreateProductVariantParams) {
  const createRes = await apiFetch('data/product-variants', {
    method: 'POST',
    body: data,
  });

  return createRes;
}

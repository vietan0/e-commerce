import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { Prisma, product } from '@/src/generated/prisma/client';
import type { prisma } from '@/src/lib/prisma';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type UpdateProductParams = {
  data: Prisma.Args<typeof prisma.product, 'update'>['data'];
  id: product['id'];
};

export default function useUpdateProduct() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: (updateProductParams: UpdateProductParams) =>
      updateProduct(updateProductParams),
    onSuccess: async ({ product }) => {
      displaySnackbar({ content: t('Product updated') });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({
          queryKey: ['product', product.id],
        }),
      ]);
    },
  });
}

async function updateProduct({ data, id }: UpdateProductParams) {
  const updateRes = await apiFetch(`/products/${id}`, {
    method: 'PATCH',
    body: data,
  });

  return updateRes;
}

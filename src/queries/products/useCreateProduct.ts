import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { Prisma } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';

type CreateProductParams = {
  // data: Prisma.Args<typeof prisma.product, 'create'>['data'];
  data: Prisma.productUncheckedCreateInput;
};

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations('snackbar');

  return useMutation({
    mutationKey: ['createProduct'],
    mutationFn: (createProductParams: CreateProductParams) =>
      createProduct(createProductParams),
    onSuccess: async () => {
      displaySnackbar({ content: t('Product created') });
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

async function createProduct({ data }: CreateProductParams) {
  const createRes = await apiFetch(`/products`, {
    method: 'POST',
    body: data,
  });

  return createRes;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Prisma, product } from '@/src/generated/prisma/client';
import type { prisma } from '@/src/lib/prisma';
import apiFetch from '@/src/queries/apiFetch';

type UpdateProductParams = {
  data: Prisma.Args<typeof prisma.product, 'update'>['data'];
  id: product['id'];
};

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateProductParams: UpdateProductParams) =>
      updateProduct(updateProductParams),
    onSuccess: async ({ product }) => {
      await queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      await queryClient.invalidateQueries({
        queryKey: ['getProduct', product.id],
      });
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

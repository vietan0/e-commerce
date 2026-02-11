import { useQuery } from '@tanstack/react-query';
import type { productGetPayload } from '@/lib/generated/prisma/models';

export default function useProduct(id: string) {
  return useQuery({
    queryKey: ['getProduct', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5,
  });
}

async function getProduct(id: string) {
  const res = await fetch(`/api/products/${id}`);
  type ComputedVals = { final_price: string };
  const data = (await res.json()) as
    | (ComputedVals &
        productGetPayload<{
          include: {
            product_image: true;
            discount_product: {
              include: {
                discount: {
                  include: {
                    discount_type: true;
                  };
                };
              };
            };
            manufacturer: true;
            product_category: {
              include: {
                category: true;
              };
            };
          };
        }>)
    | { error: string };

  if ('error' in data) {
    throw new Error(data.error);
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
}

import { useQuery } from '@tanstack/react-query';
import type { orderGetPayload } from '@/src/generated/prisma/models';
import type { includeDiscount } from '@/src/lib/price';
import apiFetch from '@/src/queries/apiFetch';

export default function useUserOrder(id: string) {
  return useQuery({
    queryKey: ['userOrder', id],
    queryFn: () => getUserOrder(id),
    staleTime: 1000 * 60 * 5,
  });
}

async function getUserOrder(id: string) {
  const data = await apiFetch<{
    order: orderGetPayload<{
      include: {
        delivery_type: true;
        order_product: {
          include: {
            product: {
              include: typeof includeDiscount;
            };
          };
        };
        order_status: true;
        payment_method: true;
        payment_status: true;
        store: true;
      };
    }>;
  }>(`/me/orders/${id}`);
  return data;
}

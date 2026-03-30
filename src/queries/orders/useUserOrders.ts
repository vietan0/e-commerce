import { useQuery } from '@tanstack/react-query';
import type { orderGetPayload } from '@/src/generated/prisma/models';
import type { includeDiscount } from '@/src/lib/price';
import apiFetch from '@/src/queries/apiFetch';

export default function useUserOrders() {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: getUserOrders,
    select: (data) => data.orders,
    staleTime: 1000 * 60 * 5,
  });
}

async function getUserOrders() {
  const data = await apiFetch<{
    orders: orderGetPayload<{
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
    }>[];
  }>('/me/orders');
  return data;
}

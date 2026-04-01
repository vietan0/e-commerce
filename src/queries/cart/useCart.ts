import { useQuery } from '@tanstack/react-query';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';

export default function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    select: (data) => data.cart_items,
    staleTime,
  });
}

async function getCart() {
  const data = await apiFetch<{
    cart_items: cart_itemGetPayload<{
      include: { product: { include: { thumbnail: true } } };
    }>[];
  }>('/cart');

  return data;
}

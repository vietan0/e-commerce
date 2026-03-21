import { useQuery } from '@tanstack/react-query';
import type { payment_method } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';

export default function usePaymentMethods() {
  return useQuery({
    queryKey: ['payment_methods'],
    queryFn: getPaymentMethods,
    select: (data) => data.payment_methods,
    staleTime: 1000 * 60 * 5,
  });
}

async function getPaymentMethods() {
  const data = await apiFetch<{ payment_methods: payment_method[] }>(
    '/payment_methods',
  );

  return data;
}

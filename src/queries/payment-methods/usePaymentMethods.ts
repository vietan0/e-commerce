import { useQuery } from '@tanstack/react-query';
import type { payment_method } from '@/src/generated/prisma/client';
import apiFetch from '@/src/queries/apiFetch';
import { staleTime } from '@/src/queries/options';
import type { GetManyRes } from '@/src/types';

export default function usePaymentMethods() {
  return useQuery({
    queryKey: ['payment_methods'],
    queryFn: getPaymentMethods,
    select: ({ data }) => data,
    staleTime,
  });
}

async function getPaymentMethods() {
  const data = await apiFetch<GetManyRes<payment_method>>(
    'data/payment-methods',
  );

  if ('error' in data) throw new Error(data.error);
  return data;
}

import { useQuery } from '@tanstack/react-query';
import type { ProductRes } from '@/app/types';
export default function useProjects() {
  return useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    // retry: 0,
    // refetchOnWindowFocus: false,
  });
}

async function getProducts() {
  const res = await fetch('/api/products');
  const data = (await res.json()) as ProductRes;
  return data;
}

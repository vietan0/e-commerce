import { usePathname, useSearchParams } from 'next/navigation';

export default function useReturnTo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathWithParams = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`;

  return pathWithParams;
}

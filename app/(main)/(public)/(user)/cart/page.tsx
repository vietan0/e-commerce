import type { Metadata } from 'next';
import CartClient from '@/app/(main)/(public)/(user)/cart/CartClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Giỏ hàng',
  };
}

export default function Cart() {
  return <CartClient />;
}

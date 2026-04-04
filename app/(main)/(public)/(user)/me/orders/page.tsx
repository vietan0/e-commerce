import type { Metadata } from 'next';
import OrdersClient from '@/app/(main)/(public)/(user)/me/orders/OrdersClient';

export const metadata: Metadata = {
  title: 'Lịch sử đơn hàng - CellphoneS',
};

export default function Orders() {
  return <OrdersClient />;
}

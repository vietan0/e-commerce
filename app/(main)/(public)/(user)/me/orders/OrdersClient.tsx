'use client';
import { Icon } from '@iconify/react';
import { Button, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import Order from '@/app/(main)/(public)/(user)/me/orders/_components/Order';
import OrderStatusTabs from '@/app/(main)/(public)/(user)/me/orders/OrderStatusTabs';
import useUserOrders from '@/src/queries/orders/useUserOrders';

export default function OrdersClient() {
  const searchParams = useSearchParams();
  const status_code = searchParams.get('status_code');
  const {
    data: orders,
    isPending,
    error,
  } = useUserOrders({ status_code: status_code || undefined });

  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;
  return (
    <>
      <OrderStatusTabs />
      {orders.length > 0 ? (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </Stack>
      ) : (
        <Stack spacing={2} sx={{ alignItems: 'center', mt: 6 }}>
          <Icon
            color="lightgrey"
            fontSize={60}
            icon="material-symbols:shopping-bag-outline"
          />
          <Typography variant="h6">Bạn chưa có đơn hàng nào.</Typography>
          {status_code ? (
            <Button component={NextLink} href="/me/orders">
              Bỏ lọc
            </Button>
          ) : (
            <Button component={NextLink} href="/" variant="contained">
              Mua ngay
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}

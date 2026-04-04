'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import QueryError from '@/app/_components/QueryError';
import Order from '@/app/(main)/(public)/(user)/me/orders/_components/Order';
import useUserOrders from '@/src/queries/orders/useUserOrders';

export default function OrdersClient() {
  const { data: orders, isPending, error } = useUserOrders();

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;
  return orders.length > 0 ? (
    <Stack spacing={2}>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </Stack>
  ) : (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Icon
        color="lightgrey"
        fontSize={60}
        icon="material-symbols:shopping-bag-outline"
      />
      <Typography variant="h6">Bạn chưa có đơn hàng nào.</Typography>
      <Button component={NextLink} href="/" variant="contained">
        Mua ngay
      </Button>
    </Stack>
  );
}

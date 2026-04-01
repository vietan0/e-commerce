'use client';
import { Box, CircularProgress } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
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
  return (
    <Box>
      {orders.map((order) => (
        <Box key={order.id}>
          <pre>{JSON.stringify(order, null, 2)}</pre>
        </Box>
      ))}
    </Box>
  );
}

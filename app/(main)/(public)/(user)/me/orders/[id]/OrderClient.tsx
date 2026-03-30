'use client';

import { Box, CircularProgress } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import useUserOrder from '@/src/queries/orders/useUserOrder';

export default function OrderClient({ id }: { id: string }) {
  const { data: order, isPending, error } = useUserOrder(id);

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
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </Box>
  );
}

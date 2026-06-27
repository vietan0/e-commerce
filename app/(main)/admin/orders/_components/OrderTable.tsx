'use client';

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import OrderRow from '@/app/(main)/admin/orders/_components/OrderRow';
import useResource from '@/src/queries/useResource';

export default function OrderTable() {
  const { data: orders, isPending, error } = useResource('orders');
  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;
  if (orders.length === 0)
    return <Typography variant="h6">No orders.</Typography>;
  return (
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total Value</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Delivery Type</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import { TableCell, TableRow } from '@mui/material';
import OrderStatusInteractiveChip from '@/app/(main)/(public)/(user)/me/orders/_components/OrderStatusInteractiveChip';
import useDayjs from '@/src/hooks/useDayjs';
import { formatPrice } from '@/src/lib/price';
import type { OrderCommon } from '@/src/types';

export default function OrderRow({ order }: { order: OrderCommon }) {
  const {
    id,
    code,
    total_value,
    user_name,
    delivery_type,
    order_status,
    payment_status,
    payment_method,
    created_at,
  } = order;

  const dayjs = useDayjs();

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell>{id}</TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{user_name}</TableCell>
      <TableCell align="right">
        {formatPrice(total_value as unknown as string)}
      </TableCell>
      <TableCell>
        <OrderStatusInteractiveChip order_id={id} order_status={order_status} />
      </TableCell>
      <TableCell>{delivery_type.name}</TableCell>
      <TableCell>{payment_status.name}</TableCell>
      <TableCell>{payment_method.name}</TableCell>
      <TableCell>{dayjs(created_at).format('lll')}</TableCell>
    </TableRow>
  );
}

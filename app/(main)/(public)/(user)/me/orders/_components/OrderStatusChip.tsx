import { Chip } from '@mui/material';
import type { order_status } from '@/src/generated/prisma/client';

export default function OrderStatusChip({
  order_status,
  onClick,
}: {
  order_status: order_status;
  onClick?: () => void;
}) {
  const colorMap: Record<
    order_status['code'],
    {
      variant: 'filled' | 'outlined';
      color:
        | 'default'
        | 'warning'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success';
    }
  > = {
    PREPARING: { variant: 'outlined', color: 'warning' },
    AWAITING_PAYMENT: { variant: 'outlined', color: 'warning' },
    SHIPPED: { variant: 'outlined', color: 'primary' },
    DELIVERING: { variant: 'outlined', color: 'primary' },
    DELIVERED: { variant: 'filled', color: 'success' },
    CANCELLED: { variant: 'outlined', color: 'error' },
    REFUNDED: { variant: 'outlined', color: 'info' },
    FAILED: { variant: 'outlined', color: 'error' },
  };
  return (
    <Chip
      clickable={Boolean(onClick)}
      color={colorMap[order_status.code].color}
      label={order_status.name}
      onClick={onClick}
      size="small"
      variant={colorMap[order_status.code].variant}
    />
  );
}

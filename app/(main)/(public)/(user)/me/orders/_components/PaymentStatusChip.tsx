import { Icon } from '@iconify/react';
import { Chip } from '@mui/material';
import type { payment_status } from '@/src/generated/prisma/client';

export default function PaymentStatusChip({
  payment_status,
}: {
  payment_status: payment_status;
}) {
  const colorMap: Record<
    payment_status['code'],
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
    UNPAID: { variant: 'outlined', color: 'warning' },
    PENDING: { variant: 'outlined', color: 'primary' },
    PAID: { variant: 'outlined', color: 'success' },
    FAILED: { variant: 'outlined', color: 'error' },
  };
  return (
    <Chip
      color={colorMap[payment_status.code].color}
      icon={<Icon icon="material-symbols:attach-money-rounded" />}
      label={payment_status.name}
      size="small"
      variant={colorMap[payment_status.code].variant}
    />
  );
}

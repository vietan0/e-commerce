import { useState } from 'react';
import ChangeOrderStatusDialog from '@/app/(main)/(public)/(user)/me/orders/_components/ChangeOrderStatusDialog';
import OrderStatusChip from '@/app/(main)/(public)/(user)/me/orders/_components/OrderStatusChip';
import type { order_status } from '@/src/generated/prisma/client';

export default function OrderStatusInteractiveChip({
  order_id,
  order_status,
}: {
  order_id: bigint;
  order_status: order_status;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <OrderStatusChip onClick={handleOpen} order_status={order_status} />
      <ChangeOrderStatusDialog
        handleClose={handleClose}
        open={open}
        order_id={order_id}
        order_status={order_status}
      />
    </div>
  );
}

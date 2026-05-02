import { useState } from 'react';
import ChangeOrderStatusDialog from '@/app/(main)/(public)/(user)/me/orders/_components/ChangeOrderStatusDialog';
import OrderStatusChip from '@/app/(main)/(public)/(user)/me/orders/_components/OrderStatusChip';
import { useOrderStore } from '@/src/store/OrderStore';

export default function OrderStatusInteractiveChip() {
  const { order_status } = useOrderStore((state) => state.order);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <OrderStatusChip onClick={handleOpen} order_status={order_status} />
      <ChangeOrderStatusDialog handleClose={handleClose} open={open} />
    </div>
  );
}

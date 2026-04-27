import { Typography } from '@mui/material';
import OrderTable from '@/app/(main)/admin/orders/_components/OrderTable';

export default function Orders() {
  return (
    <>
      <Typography gutterBottom variant="h5">
        Orders
      </Typography>
      <OrderTable />
    </>
  );
}

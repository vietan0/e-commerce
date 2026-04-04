import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import OrderProduct from '@/app/(main)/(public)/(user)/me/orders/_components/OrderProduct';
import { dayjsExt } from '@/src/lib/dayjs';
import { formatPrice } from '@/src/lib/price';
import type { OrderCommon } from '@/src/types';

export default function Order({ order }: { order: OrderCommon }) {
  return (
    <Box
      sx={{
        outline: 1,
        borderRadius: 2,
        outlineColor: 'grey.300',
        p: 2,
      }}
    >
      <Link
        component={NextLink}
        href={`/me/orders/${order.id}`}
        sx={{ fontWeight: 700 }}
        underline="hover"
      >
        #{order.code}
      </Link>
      <Typography color="grey.600" variant="body2">
        {dayjsExt(order.created_at).format('l')}
      </Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        {order.order_product.map((order_product) => (
          <OrderProduct key={order_product.id} order_product={order_product} />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body2">Thành tiền</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {formatPrice(order.total_value.toString())}
        </Typography>
      </Stack>
    </Box>
  );
}

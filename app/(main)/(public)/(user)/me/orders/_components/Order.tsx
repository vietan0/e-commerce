import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import OrderProduct from '@/app/(main)/(public)/(user)/me/orders/_components/OrderProduct';
import OrderStatusChip from '@/app/(main)/(public)/(user)/me/orders/_components/OrderStatusChip';
import PaymentStatusChip from '@/app/(main)/(public)/(user)/me/orders/_components/PaymentStatusChip';
import useDayjs from '@/src/hooks/useDayjs';
import { formatPrice } from '@/src/lib/price';
import type { OrderCommon } from '@/src/types';

export default function Order({ order }: { order: OrderCommon }) {
  const t = useTranslations('order');
  const dayjs = useDayjs();
  return (
    <Box
      sx={{
        outline: 1,
        borderRadius: 2,
        outlineColor: 'grey.300',
        p: 2,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Link
          component={NextLink}
          href={`/me/orders/${order.id}`}
          sx={{ fontWeight: 700 }}
          underline="hover"
        >
          #{order.code}
        </Link>
        <OrderStatusChip order_status={order.order_status} />
        <PaymentStatusChip payment_status={order.payment_status} />
      </Stack>
      <Typography color="grey.600" variant="body2">
        {dayjs(order.created_at).format('l')}
      </Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        {order.order_product.map((order_product) => (
          <OrderProduct key={order_product.id} order_product={order_product} />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body2">{t('Total')}</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {formatPrice(order.total_value.toString())}
        </Typography>
      </Stack>
    </Box>
  );
}

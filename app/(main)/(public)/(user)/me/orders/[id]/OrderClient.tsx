'use client';

import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import QueryError from '@/app/_components/QueryError';
import OrderProduct from '@/app/(main)/(public)/(user)/me/orders/_components/OrderProduct';
import theme from '@/app/theme';
import useCopy from '@/src/hooks/useCopy';
import { dayjsExt } from '@/src/lib/dayjs';
import { formatPrice } from '@/src/lib/price';
import useUserOrder from '@/src/queries/orders/useUserOrder';

export default function OrderClient({ id }: { id: string }) {
  const { data, isPending, error } = useUserOrder(id);
  const { copied, copy } = useCopy();

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  const { order } = data;
  return (
    <Box>
      <Button
        color="inherit"
        component={NextLink}
        href="/me/orders"
        size="small"
        startIcon={<Icon icon="material-symbols:arrow-back-rounded" />}
        sx={{ mb: 1 }}
      >
        Quay lại
      </Button>
      <Stack direction="row" spacing={1}>
        <Typography gutterBottom variant="h6">
          Thông tin đơn hàng
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Typography color="primary" sx={{ fontWeight: 700 }} variant="h6">
            #{order.code}
          </Typography>
          <IconButton
            aria-label="Copy mã đơn hàng"
            disabled={copied}
            onClick={() => copy(order.code)}
          >
            <Icon
              color={
                copied
                  ? theme.palette.success.light
                  : theme.palette.primary.main
              }
              fontSize={16}
              icon={
                copied
                  ? 'material-symbols:check-rounded'
                  : 'material-symbols:content-copy-outline-rounded'
              }
            />
          </IconButton>
        </Stack>
      </Stack>
      <Grid container spacing={0.5} sx={{ fontSize: 14, mb: 4, mt: 2 }}>
        <Grid container size={12}>
          <Grid size={4}>Thời gian đặt</Grid>
          <Grid size={8}>{dayjsExt(order.created_at).format('LT, l')}</Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Tên người nhận</Grid>
          <Grid size={8}>{order.app_user.name}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Địa chỉ Email</Grid>
          <Grid size={8}>{order.app_user.email}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Số điện thoại</Grid>
          <Grid size={8}>{order.app_user.phone}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Phương thức thanh toán</Grid>
          <Grid size={8}>
            {order.payment_method.name} ({order.payment_method.code})
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Địa chỉ giao hàng</Grid>
          <Grid size={8}>{order.shipping_address}</Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>Ghi chú</Grid>
          <Grid size={8}>{order.note || '-'}</Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Sản phẩm</Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        {order.order_product.map((order_product) => (
          <OrderProduct key={order_product.id} order_product={order_product} />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={0.5} sx={{ fontSize: 14 }}>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>Tổng giá trị sản phẩm</Grid>
          <Grid>{formatPrice(order.subtotal.toString())}</Grid>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>Phí giao hàng</Grid>
          <Grid>
            {order.shipping_fee
              ? formatPrice(order.shipping_fee.toString())
              : '-'}
          </Grid>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>Thành tiền</Grid>
          <Grid sx={{ fontSize: 18, fontWeight: 700 }}>
            {formatPrice(order.total_value.toString())}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

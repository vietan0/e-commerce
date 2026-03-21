'use client';

import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import CartItem from '@/app/(main)/(public)/(user)/cart/_components/CartItem';
import Address from '@/app/(main)/(public)/(user)/checkout/_components/Address';
import PaymentMethod from '@/app/(main)/(public)/(user)/checkout/_components/PaymentMethod';
import useCart from '@/src/queries/cart/useCart';
import usePaymentMethods from '@/src/queries/payment_methods/usePaymentMethods';

export default function Checkout() {
  const { data, isPending, error, refetch } = useCart();
  refetch(); // fetch manually once to ensure product data is fresh
  const {
    data: paymentMethods,
    isPending: isPaymentMethodsPending,
    error: paymentMethodsError,
  } = usePaymentMethods();

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Box>
      <Typography sx={{ mb: 3 }} variant="h5">
        Thanh toán
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Địa chỉ nhận hàng</Typography>
        <Address />
      </Box>
      <Stack spacing={1}>
        <Grid
          container
          spacing={1}
          sx={{ mb: 1, px: 2, fontSize: 14, color: 'grey.600' }}
        >
          <Grid size={5}>Sản phẩm</Grid>
          <Grid size={1.5} sx={{ textAlign: 'end' }}>
            Đơn giá
          </Grid>
          <Grid size={1.5} sx={{ textAlign: 'center' }}>
            Số lượng
          </Grid>
          <Grid size={1.5} sx={{ textAlign: 'end' }}>
            Thành tiền
          </Grid>
          <Grid size={2.5} sx={{ textAlign: 'end' }}>
            Thao tác
          </Grid>
        </Grid>
        {data.cart_items.map((cart_item) => (
          <CartItem cart_item={cart_item} key={cart_item.id} />
        ))}
      </Stack>
      {isPaymentMethodsPending ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : paymentMethodsError ? (
        <QueryError error={paymentMethodsError} />
      ) : (
        paymentMethods.map((payment_method) => (
          <PaymentMethod
            key={payment_method.id}
            payment_method={payment_method}
          />
        ))
      )}
    </Box>
  );
}

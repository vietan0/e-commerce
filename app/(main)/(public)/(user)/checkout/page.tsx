'use client';
import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import QueryError from '@/app/_components/QueryError';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import CheckoutCartItem from '@/app/(main)/(public)/(user)/checkout/_components/CheckoutCartItem';
import CustomerInfo from '@/app/(main)/(public)/(user)/checkout/_components/CustomerInfo';
import DeliveryTypes from '@/app/(main)/(public)/(user)/checkout/_components/DeliveryTypes';
import EmptyCartInCheckout from '@/app/(main)/(public)/(user)/checkout/_components/EmptyCartInCheckout';
import PaymentMethods from '@/app/(main)/(public)/(user)/checkout/_components/PaymentMethods';
import { formatPrice } from '@/src/lib/price';
import useCart from '@/src/queries/cart/useCart';

export type OrderFields = {
  delivery_type_id: string;
  store_id?: string;
  shipping_address?: string;
  payment_method_id: string;
  note?: string;
};

export default function Checkout() {
  const { data: cart_items, isPending, error, refetch } = useCart();
  refetch(); // fetch manually once to ensure product data is fresh
  const methods = useForm<OrderFields>({
    defaultValues: {
      store_id: '',
    },
  });
  const { register, control, handleSubmit, watch } = methods;
  const onSubmit: SubmitHandler<OrderFields> = (data) => console.log(data);

  const formData = watch();
  console.log('formData', formData);

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;
  if (cart_items.length === 0) return <EmptyCartInCheckout />;

  const totalAmount = cart_items.reduce((prev, curr) => {
    // @ts-expect-error
    return prev + Number(curr.product.final_price) * curr.quantity;
  }, 0);

  return (
    <FormProvider {...methods}>
      <Box>
        <Typography sx={{ mb: 3 }} variant="h5">
          Thanh toán
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6">Thông tin khách hàng</Typography>
            <CustomerInfo />
          </Box>
          <Stack spacing={1}>
            <Grid
              container
              spacing={2}
              sx={{
                mb: 1,
                alignItems: 'center',
                fontSize: 14,
                color: 'grey.600',
              }}
            >
              <Grid size={6}>
                <Typography color="textPrimary" variant="h6">
                  Sản phẩm
                </Typography>
              </Grid>
              <Grid size={2} sx={{ textAlign: 'end' }}>
                Đơn giá
              </Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>
                Số lượng
              </Grid>
              <Grid size={2} sx={{ textAlign: 'end' }}>
                Thành tiền
              </Grid>
            </Grid>
            {cart_items.map((cart_item) => (
              <CheckoutCartItem cart_item={cart_item} key={cart_item.id} />
            ))}
            <Grid
              container
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 1.5,
                backgroundColor: 'grey.100',
                alignItems: 'center',
              }}
            >
              <Grid size={12} sx={{ textAlign: 'end' }}>
                <Typography>
                  Tổng cộng ({cart_items.length} sản phẩm)
                </Typography>
                <Typography color="primary" sx={{ fontSize: 18 }}>
                  {formatPrice(totalAmount.toString())}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Box>
            <Typography variant="h6">Phương thức thanh toán</Typography>
            <PaymentMethods />
          </Box>
          <Box>
            <Typography variant="h6">Thông tin nhận hàng</Typography>
            <DeliveryTypes />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 1.5,
              backgroundColor: 'grey.100',
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{ width: 0.4, ml: 'auto', alignItems: 'end' }}
            >
              <Grid size={7} sx={{ color: 'grey.600' }}>
                Tổng tiền hàng
              </Grid>
              <Grid size={5} sx={{ textAlign: 'end' }}>
                {formatPrice(totalAmount.toString())}
              </Grid>
              <Grid size={7} sx={{ color: 'grey.600' }}>
                Tổng tiền phí vận chuyển
              </Grid>
              <Grid size={5} sx={{ textAlign: 'end' }}>
                1000
              </Grid>
              <Grid size={7} sx={{ color: 'grey.600' }}>
                Tổng thanh toán
              </Grid>
              <Grid
                size={5}
                sx={{ textAlign: 'end', color: 'primary.main', fontSize: 24 }}
              >
                {formatPrice(totalAmount.toString())}
              </Grid>
            </Grid>
            <Box>Note</Box>
            <Divider sx={{ my: 2 }} />
            <Button
              onClick={handleSubmit(onSubmit)}
              size="large"
              sx={{ display: 'block', ml: 'auto' }}
              variant="contained"
            >
              Đặt hàng
            </Button>
          </Box>
        </Stack>
      </Box>
      {/* Non-functional, for Devtools only */}
      <VisuallyHiddenInput {...register('delivery_type_id')} />
      <VisuallyHiddenInput {...register('shipping_address')} />
      <VisuallyHiddenInput {...register('store_id')} />
      <VisuallyHiddenInput {...register('payment_method_id')} />
      <DevTool control={control} />
    </FormProvider>
  );
}

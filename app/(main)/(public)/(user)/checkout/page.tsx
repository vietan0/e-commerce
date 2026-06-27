'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import QueryError from '@/app/_components/QueryError';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import CheckoutCartItem from '@/app/(main)/(public)/(user)/checkout/_components/CheckoutCartItem';
import CustomerInfo from '@/app/(main)/(public)/(user)/checkout/_components/CustomerInfo';
import DeliveryTypes from '@/app/(main)/(public)/(user)/checkout/_components/DeliveryTypes';
import EmptyCartInCheckout from '@/app/(main)/(public)/(user)/checkout/_components/EmptyCartInCheckout';
import PaymentMethods from '@/app/(main)/(public)/(user)/checkout/_components/PaymentMethods';
import { calcOrderValues } from '@/app/api/orders/orderCalc';
import { navId } from '@/src/constants/ui';
import { formatPrice } from '@/src/lib/price';
import useMe from '@/src/queries/auth/useMe';
import useCart from '@/src/queries/cart/useCart';
import useCreateOrder from '@/src/queries/orders/useCreateOrder';
import useResource from '@/src/queries/useResource';

export type OrderFields = {
  delivery_type_id: string;
  store_id?: string;
  shipping_address?: string;
  payment_method_id: string;
  note?: string;
};

export default function Checkout() {
  const t = useTranslations();
  const { data: cart_items, isPending, error, refetch } = useCart();
  const { data: meData } = useMe();
  useEffect(() => {
    refetch(); // fetch manually once to ensure product data is fresh
  }, [refetch]);

  const methods = useForm<OrderFields>();
  const { register, control, handleSubmit } = methods;
  const createOrder = useCreateOrder();
  const onSubmit: SubmitHandler<OrderFields> = (data) => {
    createOrder.mutate(data);
  };

  const {
    data: deliveryTypes,
    isPending: isDeliveryTypesPending,
    error: deliveryTypesError,
  } = useResource('delivery-types');

  const deliveryTypeId = useWatch({ control, name: 'delivery_type_id' });

  const deliveryType = useMemo(() => {
    return deliveryTypes?.find(
      (delivery_type) => String(delivery_type.id) === deliveryTypeId,
    );
  }, [deliveryTypes, deliveryTypeId]);

  const shipping_fee = useMemo(
    () => deliveryType?.shipping_fee,
    [deliveryType],
  );

  const formError = useMemo(() => {
    if (!meData?.app_user.name || !meData.app_user.phone)
      return t('profile.Missing name and phone number');
    if (deliveryType?.code === 'HOME_DELIVERY' && !meData.app_user.address) {
      return t('profile.Missing address');
    }
    return undefined;
  }, [meData, deliveryType, t]);

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;
  if (cart_items.length === 0) return <EmptyCartInCheckout />;

  const { subtotal, total_value } = calcOrderValues(
    cart_items,
    Number(shipping_fee) || 0,
  );

  function scrollToUserEditFormOrder() {
    const customerInfo = document.getElementById('CustomerInfo')!;
    const nav = document.getElementById(navId)!;
    const topPadding = 48;
    const top =
      customerInfo.getBoundingClientRect().top +
      window.scrollY -
      nav.getBoundingClientRect().height -
      topPadding;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <FormProvider {...methods}>
      <Box>
        <Typography sx={{ mb: 3 }} variant="h5">
          {t('cart.Checkout')}
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6">{t('cart.Customer info')}</Typography>
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
                  {t('cart.Product')}
                </Typography>
              </Grid>
              <Grid size={2} sx={{ textAlign: 'end' }}>
                {t('cart.Unit Price')}
              </Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>
                {t('cart.Quantity')}
              </Grid>
              <Grid size={2} sx={{ textAlign: 'end' }}>
                {t('cart.Amount')}
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
                  {t('cart.Subtotal')} ({cart_items.length}{' '}
                  {t('cart.products', { count: cart_items.length })})
                </Typography>
                <Typography color="primary" sx={{ fontSize: 18 }}>
                  {formatPrice(subtotal)}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Box>
            <Typography variant="h6">{t('cart.Delivery info')}</Typography>
            <DeliveryTypes />
          </Box>
          <Box>
            <Typography variant="h6">{t('cart.Payment method')}</Typography>
            <PaymentMethods />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 1.5,
              backgroundColor: 'grey.100',
            }}
          >
            <Grid container spacing={4}>
              <Grid size={6}>
                <Controller
                  control={control}
                  name="note"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="outlined-multiline-static"
                      label="Ghi chú (nếu có)"
                      multiline
                      placeholder="Note cho người giao hàng"
                      rows={2}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid container size={6} spacing={1} sx={{ alignItems: 'end' }}>
                <Grid size={7} sx={{ color: 'grey.600' }}>
                  {t('cart.Subtotal-main')}
                </Grid>
                <Grid size={5} sx={{ textAlign: 'end' }}>
                  {formatPrice(subtotal)}
                </Grid>
                <Grid size={7} sx={{ color: 'grey.600' }}>
                  {t('cart.Shipping fee')}
                </Grid>
                <Grid size={5} sx={{ textAlign: 'end' }}>
                  {isDeliveryTypesPending || !shipping_fee ? (
                    <CircularProgress size={16} />
                  ) : deliveryTypesError ? (
                    <QueryError error={deliveryTypesError} />
                  ) : (
                    formatPrice(shipping_fee)
                  )}
                </Grid>
                <Grid size={7} sx={{ color: 'grey.600' }}>
                  {t('cart.Total')}
                </Grid>
                <Grid
                  size={5}
                  sx={{ textAlign: 'end', color: 'primary.main', fontSize: 24 }}
                >
                  {formatPrice(total_value)}
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" sx={{ justifyContent: 'end' }}>
              <Stack spacing={1}>
                <Button
                  disabled={Boolean(formError)}
                  loading={createOrder.isPending}
                  onClick={handleSubmit(onSubmit)}
                  size="large"
                  variant="contained"
                >
                  {t('cart.Order')}
                </Button>
                {formError && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Typography color="error">{formError}</Typography>
                    <Button
                      onClick={scrollToUserEditFormOrder}
                      startIcon={
                        <Icon icon="material-symbols:edit-outline-rounded" />
                      }
                    >
                      {t('profile.Add info')}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      {/* Non-functional, for Devtools only */}
      <VisuallyHiddenInput {...register('delivery_type_id')} />
      <VisuallyHiddenInput {...register('shipping_address')} />
      <VisuallyHiddenInput {...register('store_id')} />
      <VisuallyHiddenInput {...register('payment_method_id')} />
      <DevT control={control} />
    </FormProvider>
  );
}

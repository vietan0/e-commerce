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
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import QueryError from '@/app/_components/QueryError';
import OrderProduct from '@/app/(main)/(public)/(user)/me/orders/_components/OrderProduct';
import theme from '@/app/theme';
import useCopy from '@/src/hooks/useCopy';
import useDayjs from '@/src/hooks/useDayjs';
import { formatPrice } from '@/src/lib/price';
import useUserOrder from '@/src/queries/orders/useUserOrder';

export default function OrderClient({ id }: { id: string }) {
  const { data, isPending, error } = useUserOrder(id);
  const { copied, copy } = useCopy();
  const t = useTranslations();
  const dayjs = useDayjs();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const isNewOrder = searchParams.get('new');

  useEffect(() => {
    if (isNewOrder === 'true') {
      // order was just created -> invalidate cart query
      // because invalidate cart query in mutation's onSuccess would happen before this order page renders,
      // producing a flash of empty cart message
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.replace(`/me/orders/${id}`); // remove 'new=true' search params
    }
  }, [isNewOrder, queryClient, router, id]);

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
        {t('common.Go back')}
      </Button>
      <Stack direction="row" spacing={1}>
        <Typography gutterBottom variant="h6">
          {t('order.Order information')}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Typography color="primary" sx={{ fontWeight: 700 }} variant="h6">
            #{order.code}
          </Typography>
          <IconButton
            aria-label={t('order.Copy order code')}
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
          <Grid size={4}>{t('order.Created at')}</Grid>
          <Grid size={8}>{dayjs(order.created_at).format('LT, l')}</Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('order.Recipient')}</Grid>
          <Grid size={8}>{order.app_user.name}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('order.Email')}</Grid>
          <Grid size={8}>{order.app_user.email}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('profile.Phone')}</Grid>
          <Grid size={8}>{order.app_user.phone}</Grid>
          {/* should record within order */}
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('cart.Payment method')}</Grid>
          <Grid size={8}>
            {order.payment_method.name} ({order.payment_method.code})
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('order.Shipping address')}</Grid>
          <Grid size={8}>{order.shipping_address}</Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={4}>{t('order.Note')}</Grid>
          <Grid size={8}>{order.note || '-'}</Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">{t('cart.Product')}</Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        {order.order_product.map((order_product) => (
          <OrderProduct key={order_product.id} order_product={order_product} />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={0.5} sx={{ fontSize: 14 }}>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>{t('order.Subtotal')}</Grid>
          <Grid>{formatPrice(order.subtotal.toString())}</Grid>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>{t('order.Shipping fee')}</Grid>
          <Grid>
            {order.shipping_fee
              ? formatPrice(order.shipping_fee.toString())
              : '-'}
          </Grid>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: 'space-between' }}>
          <Grid>{t('order.Total')}</Grid>
          <Grid sx={{ fontSize: 18, fontWeight: 700 }}>
            {formatPrice(order.total_value.toString())}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

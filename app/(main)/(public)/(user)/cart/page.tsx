'use client';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import EmptyCart from '@/app/_components/EmptyCart';
import QueryError from '@/app/_components/QueryError';
import CartItem from '@/app/(main)/(public)/(user)/cart/_components/CartItem';
import { formatPrice } from '@/src/lib/price';
import useCart from '@/src/queries/cart/useCart';

export default function Cart() {
  const { data: cart_items, isPending, error } = useCart();
  const t = useTranslations('cart');

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;
  if (cart_items.length === 0) return <EmptyCart inMenu={false} />;

  const totalAmount = cart_items.reduce((prev, curr) => {
    // @ts-expect-error
    return prev + Number(curr.product.final_price) * curr.quantity;
  }, 0);
  return (
    <Box>
      <Typography sx={{ mb: 3 }} variant="h5">
        {t('Cart')}
      </Typography>
      <Stack spacing={1}>
        <Grid
          container
          spacing={2}
          sx={{
            mb: 1,
            px: 2,
            alignItems: 'center',
            fontSize: 14,
            color: 'grey.600',
          }}
        >
          <Grid size={5}>{t('Product')}</Grid>
          <Grid size={1.5} sx={{ textAlign: 'end' }}>
            {t('Unit Price')}
          </Grid>
          <Grid size={1.5} sx={{ textAlign: 'center' }}>
            {t('Quantity')}
          </Grid>
          <Grid size={1.5} sx={{ textAlign: 'end' }}>
            {t('Amount')}
          </Grid>
          <Grid size={2.5} sx={{ textAlign: 'end' }}>
            {t('Actions')}
          </Grid>
        </Grid>
        {cart_items.map((cart_item) => (
          <CartItem cart_item={cart_item} key={cart_item.id} />
        ))}
      </Stack>
      <Grid
        container
        spacing={1}
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 1.5,
          backgroundColor: 'grey.100',
          alignItems: 'center',
        }}
      >
        <Grid size={5}></Grid>
        <Grid size={4.5} sx={{ textAlign: 'end' }}>
          <Typography>
            {t('Subtotal')} ({cart_items.length}{' '}
            {t('products', { count: cart_items.length })}):
          </Typography>
          <Typography color="primary" sx={{ fontSize: 18 }}>
            {formatPrice(totalAmount)}
          </Typography>
        </Grid>
        <Grid size={2.5} sx={{ textAlign: 'end' }}>
          <Button component={NextLink} href="/checkout" variant="contained">
            {t('Checkout')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

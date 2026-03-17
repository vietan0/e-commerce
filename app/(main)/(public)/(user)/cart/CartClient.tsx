'use client';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import EmptyCart from '@/app/_components/EmptyCart';
import QueryError from '@/app/_components/QueryError';
import CartItem from '@/app/(main)/(public)/(user)/cart/_components/CartItem';
import useCart from '@/src/queries/cart/useCart';

export default function CartClient() {
  const { data, isPending, error } = useCart();

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;
  if (data.cart_items.length === 0) return <EmptyCart inMenu={false} />;

  return (
    <Box>
      <Typography gutterBottom variant="h5">
        Giỏ hàng
      </Typography>
      <Stack spacing={1}>
        <Grid
          container
          spacing={1}
          sx={{ mb: 1, fontSize: 14, color: 'grey.600' }}
        >
          <Grid size={5}>Sản phẩm</Grid>
          <Grid size={1.5}>Đơn giá</Grid>
          <Grid size={1.5} sx={{ textAlign: 'center' }}>
            Số lượng
          </Grid>
          <Grid size={1.5}>Số tiền</Grid>
          <Grid>Thao tác</Grid>
        </Grid>
        {data.cart_items.map((cart_item) => (
          <CartItem cart_item={cart_item} key={cart_item.id} />
        ))}
      </Stack>
    </Box>
  );
}

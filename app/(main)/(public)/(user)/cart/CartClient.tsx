'use client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
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

  if (error) {
    return (
      <Typography color="error.light">
        Error fetching cart:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );
  }

  return (
    <Box>
      <Typography gutterBottom variant="h5">
        Giỏ hàng
      </Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid size={5}>Sản phẩm</Grid>
        <Grid size={2}>Đơn giá</Grid>
        <Grid size={1.5} sx={{ textAlign: 'center' }}>
          Số lượng
        </Grid>
        <Grid size={2}>Số tiền</Grid>
        <Grid>Thao tác</Grid>
      </Grid>
      {data.cart_items.map((cart_item) => (
        <CartItem cart_item={cart_item} key={cart_item.id} />
      ))}
    </Box>
  );
}

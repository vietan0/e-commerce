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
import EmptyCart from '@/app/_components/EmptyCart';
import QueryError from '@/app/_components/QueryError';
import CartItem from '@/app/(main)/(public)/(user)/cart/_components/CartItem';
import { formatPrice } from '@/src/lib/price';
import useCart from '@/src/queries/cart/useCart';

export default function Cart() {
  const { data: cart_items, isPending, error } = useCart();

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
    return prev + Number(curr.product.final_price) * curr.amount;
  }, 0);
  return (
    <Box>
      <Typography sx={{ mb: 3 }} variant="h5">
        Giỏ hàng
      </Typography>
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
        <Typography>Phương thức thanh toán</Typography>
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
          <Typography component="span">
            Tổng cộng ({cart_items.length} sản phẩm):
          </Typography>
          <Typography
            color="primary"
            component="span"
            sx={{ ml: 2, fontSize: 20, fontWeight: 700 }}
          >
            {formatPrice(totalAmount.toString())}
          </Typography>
        </Grid>
        <Grid size={2.5} sx={{ textAlign: 'end' }}>
          <Button component={NextLink} href="/checkout" variant="contained">
            Mua hàng
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

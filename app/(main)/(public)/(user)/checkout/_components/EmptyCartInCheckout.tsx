import { Icon } from '@iconify/react';
import { Button, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

export default function EmptyCartInCheckout() {
  return (
    <Stack
      spacing={1}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
      }}
    >
      <Icon color="lightgrey" fontSize={60} icon="mingcute:empty-box-line" />
      <Typography variant="h6">
        Giỏ hàng của bạn còn trống - Bạn cần thêm sản phẩm để thanh toán.
      </Typography>
      <Button component={NextLink} href="/">
        Mua ngay
      </Button>
    </Stack>
  );
}

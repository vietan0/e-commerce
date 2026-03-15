import { Icon } from '@iconify/react';
import { Button, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

export default function EmptyCart({ inMenu }: { inMenu: boolean }) {
  return (
    <Stack
      spacing={1}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: inMenu ? '20vh' : '40vh',
      }}
    >
      <Icon
        color="lightgrey"
        fontSize={inMenu ? 40 : 60}
        icon="mingcute:empty-box-line"
      />
      <Typography variant={inMenu ? 'body1' : 'h6'}>
        Giỏ hàng của bạn còn trống.
      </Typography>
      {!inMenu && (
        <Button component={NextLink} href="/">
          Về trang chủ
        </Button>
      )}
    </Stack>
  );
}

'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import CartBtn from '@/app/_components/nav/cart/CartBtn';
import ProfileMenu from '@/app/_components/nav/ProfileMenu';
import useMe from '@/src/queries/auth/useMe';

export default function RightBtns() {
  const { data, isPending, error } = useMe();

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="inherit" size={20} />
      </Box>
    );

  if (error) {
    return (
      <Typography color="error.light">
        Error fetching current user:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <CartBtn />
      {data?.app_user.is_admin && (
        <Button
          color="inherit"
          component={NextLink}
          href="/admin"
          startIcon={
            <Icon icon="material-symbols:admin-panel-settings-rounded" />
          }
          variant="outlined"
        >
          Admin
        </Button>
      )}
      {data ? (
        <ProfileMenu name={data.app_user.name || data.app_user.email} />
      ) : (
        <Button
          color="inherit"
          component={NextLink}
          href="/login"
          startIcon={<Icon icon="material-symbols:login-rounded" />}
          variant="outlined"
        >
          Đăng nhập
        </Button>
      )}
    </Stack>
  );
}

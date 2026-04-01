'use client';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import NextLink from 'next/link';
import CartBtn from '@/app/_components/nav/cart/CartBtn';
import ProfileMenu from '@/app/_components/nav/ProfileMenu';
import QueryError from '@/app/_components/QueryError';
import useMe from '@/src/queries/auth/useMe';

export default function RightBtns() {
  const { data, isPending, error } = useMe();

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="inherit" size={20} />
      </Box>
    );

  if (error) return <QueryError error={error} />;

  return (
    <Stack direction="row" spacing={1}>
      <CartBtn />
      {data?.app_user.is_admin && (
        <Button
          color="inherit"
          component={NextLink}
          href="/admin"
          startIcon={
            <Icon icon="material-symbols:admin-panel-settings-outline-rounded" />
          }
          variant="outlined"
        >
          Admin
        </Button>
      )}
      {data ? (
        <ProfileMenu
          name={data.app_user.name || data.app_user.email}
          profilePicUrl={data.app_user.profilePic?.url}
        />
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

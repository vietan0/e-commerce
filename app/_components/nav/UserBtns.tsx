'use client';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import ProfileMenu from '@/app/_components/nav/ProfileMenu';
import QueryError from '@/app/_components/QueryError';
import useMe from '@/src/queries/auth/useMe';

export default function UserBtns() {
  const { data, isPending, error } = useMe();
  const t = useTranslations('common');

  if (isPending)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress color="inherit" size={20} />
      </Box>
    );

  if (error) return <QueryError error={error} />;

  if (data === null) {
    return (
      <Button
        color="inherit"
        component={NextLink}
        href="/login"
        startIcon={<Icon icon="material-symbols:login-rounded" />}
        variant="outlined"
      >
        {t('Login')}
      </Button>
    );
  }

  return (
    <>
      {data.app_user.is_admin && (
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
      <ProfileMenu
        name={data.app_user.name || data.app_user.email}
        profilePicUrl={data.app_user.profilePic?.url}
      />
    </>
  );
}

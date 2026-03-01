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
import useMe from '@/src/queries/auth/useMe';

export default function RightBtns() {
  const { data, isPending, error } = useMe();

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
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
      {data?.user.is_admin && (
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
        <Button
          color="inherit"
          component={NextLink}
          href="/user" // not built yet
          startIcon={<Icon icon="material-symbols:person-rounded" />}
          variant="outlined"
        >
          {data.user.name || data.user.email}
        </Button>
      ) : (
        <Button
          color="inherit"
          component={NextLink}
          href="/login"
          startIcon={<Icon icon="material-symbols:login-rounded" />}
          variant="outlined"
        >
          Login
        </Button>
      )}
    </Stack>
  );
}

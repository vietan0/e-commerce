'use client';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, Stack } from '@mui/material';
import NextLink from 'next/link';
import ElevationScroll from '@/app/_components/nav/ElevationScroll';
import HomeLink from '@/app/_components/nav/HomeLink';
import NavCategories from '@/app/_components/nav/NavCategories';

export default function Nav() {
  return (
    <ElevationScroll>
      <AppBar
        color="primary"
        position="sticky"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <HomeLink />
          <NavCategories />
        </Box>
        <Stack direction="row" spacing={1}>
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
          <Button
            color="inherit"
            component={NextLink}
            href="/login"
            startIcon={<Icon icon="material-symbols:person-rounded" />}
            variant="outlined"
          >
            Login
          </Button>
        </Stack>
      </AppBar>
    </ElevationScroll>
  );
}

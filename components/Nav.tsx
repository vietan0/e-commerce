'use client';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, Link, Menu } from '@mui/material';
import NextLink from 'next/link';
import type React from 'react';
import { useState } from 'react';
import Categories from '@/components/Categories';

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  function openMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
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
        <Link
          color="inherit"
          component={NextLink}
          fontWeight={700}
          href="/"
          underline="hover"
          variant="h6"
        >
          CellphoneS
        </Link>
        <Button
          aria-controls={open ? 'basic-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          color="inherit"
          endIcon={
            <Icon
              icon="ic:round-keyboard-arrow-down"
              rotate={open ? 2 : 0}
              style={{ fontSize: 24 }}
            />
          }
          id="categoriesBtn"
          onClick={openMenu}
          startIcon={<Icon icon="material-symbols:widgets-outline-rounded" />}
          variant="text"
        >
          Danh mục
        </Button>
        <Menu
          anchorEl={anchorEl}
          onClose={closeMenu}
          open={open}
          slotProps={{
            list: {
              'aria-labelledby': 'categoriesBtn',
              style: {
                paddingBlock: 0,
              },
            },
          }}
        >
          <Categories closeMenu={closeMenu} />
        </Menu>
      </Box>
      <Button color="inherit" variant="outlined">
        Login
      </Button>
    </AppBar>
  );
}

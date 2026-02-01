'use client';
import { Icon } from '@iconify/react';
import { Button, Menu } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import Categories from '@/components/Categories';

export default function NavCategories() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  function openMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }
  return (
    <>
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
    </>
  );
}

'use client';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useState } from 'react';
import CreateProductForm from '@/app/(main)/admin/products/_components/CreateProductForm';

export default function CreateProductButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<Icon icon="material-symbols:add-rounded" />}
        variant="contained"
      >
        Create Product
      </Button>
      <CreateProductForm handleClose={handleClose} open={open} />
    </>
  );
}

'use client';
import { Icon } from '@iconify/react';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import CreateProductForm from '@/app/(main)/admin/products/_components/CreateProductForm';
import ProductTable from '@/app/(main)/admin/products/_components/ProductTable';
export default function Products() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Typography gutterBottom variant="h5">
        Products
      </Typography>
      <Button
        onClick={handleOpen}
        startIcon={<Icon icon="material-symbols:add-rounded" />}
        variant="contained"
      >
        Create Product
      </Button>
      <CreateProductForm handleClose={handleClose} open={open} />
      <ProductTable />
    </>
  );
}

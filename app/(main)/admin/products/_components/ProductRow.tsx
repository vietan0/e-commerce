import { Stack, TableCell, TableRow } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import CategoryChip from '@/app/(main)/admin/products/_components/CategoryChip';
import DiscountChip from '@/app/(main)/admin/products/_components/DiscountChip';
import ProductEditForm from '@/app/(main)/admin/products/_components/EditProductForm';
import { placeholderImg } from '@/src/constants/ui';
import type { ProductFull } from '@/src/types';
export default function ProductRow({ product }: { product: ProductFull }) {
  const { id, name, discount_product, brand, product_category } = product;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TableRow hover onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <Image
            alt={name || ''}
            height={64}
            src={placeholderImg}
            style={{ display: 'block' }}
            width={64}
          />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{brand?.name}</TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: 'wrap' }}
            useFlexGap
          >
            {product_category.map((pc) => (
              <CategoryChip category_name={pc.category.name} key={pc.id} />
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: 'wrap' }}
            useFlexGap
          >
            {discount_product.map((dp) => (
              <DiscountChip discount_name={dp.discount.name} key={dp.id} />
            ))}
          </Stack>
        </TableCell>
      </TableRow>
      <ProductEditForm
        handleClose={handleClose}
        open={open}
        product={product}
      />
    </>
  );
}

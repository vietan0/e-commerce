import { Stack, TableCell, TableRow } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import CategoryChip from '@/app/admin/products/_components/CategoryChip';
import DiscountChip from '@/app/admin/products/_components/DiscountChip';
import ProductEditForm from '@/app/admin/products/_components/ProductEditForm';
import { formatPrice } from '@/src/lib/price';
import type { Product } from '@/src/types';
export default function ProductRow({ product }: { product: Product }) {
  const {
    id,
    name,
    thumbnail,
    base_price,
    description,
    discount_product,
    manufacturer,
    product_category,
    stock,
  } = product;
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
            height={50}
            src={thumbnail || ''}
            width={50}
          />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell align="right">
          {formatPrice(base_price as unknown as string)}
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{manufacturer?.name}</TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: 'wrap' }}
            useFlexGap
          >
            {product_category.map((pc) => (
              <CategoryChip category_name={pc.category.name!} key={pc.id} />
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
              <DiscountChip discount_name={dp.discount!.name!} key={dp.id} />
            ))}
          </Stack>
        </TableCell>
        <TableCell>{stock}</TableCell>
      </TableRow>
      <ProductEditForm
        handleClose={handleClose}
        open={open}
        product={product}
      />
    </>
  );
}

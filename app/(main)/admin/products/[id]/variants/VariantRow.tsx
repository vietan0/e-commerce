import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import DeleteVariantDialog from '@/app/(main)/admin/products/[id]/variants/DeleteVariantDialog';
import type { product_variantGetPayload } from '@/src/generated/prisma/models';
import useDialog from '@/src/hooks/useDialog';
import type { includeVariant } from '@/src/lib/commonIncludes';
import { formatPrice } from '@/src/lib/price';

export default function VariantRow({
  variant,
}: {
  variant: product_variantGetPayload<{
    include: typeof includeVariant;
  }>;
}) {
  const { dialog, setOpen } = useDialog({
    title: (
      <>
        <span>Delete {variant.product_color.product?.name} variant?</span>
        <Typography color="textSecondary">
          {variant.product_color.name} - {variant.ram.capacity}
          {variant.ram.unit} - {variant.storage.capacity}
          {variant.storage.unit}
        </Typography>
      </>
    ),
    content: (
      <DeleteVariantDialog close={() => setOpen(false)} variant={variant} />
    ),
    width: '600px',
  });

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {variant.sku}
      </TableCell>
      <TableCell align="right">{variant.product_color?.name}</TableCell>
      <TableCell align="right">{formatPrice(variant.price)}</TableCell>
      <TableCell align="right">{variant.ram?.capacity}</TableCell>
      <TableCell align="right">{variant.storage?.capacity}</TableCell>
      <TableCell align="right">{variant.connectivity?.name}</TableCell>
      <TableCell align="right">
        <IconButton color="error" onClick={() => setOpen(true)} size="small">
          <Icon icon="material-symbols:delete-outline-rounded" />
        </IconButton>
        {dialog}
      </TableCell>
    </TableRow>
  );
}

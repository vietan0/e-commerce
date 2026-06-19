'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams } from 'next/navigation';
import QueryError from '@/app/_components/QueryError';
import CreateVariantDialog from '@/app/(main)/admin/products/[id]/variants/CreateVariantDialog';
import useDialog from '@/src/hooks/useDialog';
import { formatPrice } from '@/src/lib/price';
import useProduct from '@/src/queries/products/useProduct';

export default function Variants() {
  const params = useParams<{ id: string }>();
  const { data: product, isPending, error } = useProduct(params.id);
  const { dialog: createVariantDialog, setOpen } = useDialog({
    title: `Create ${product?.name} Variant`,
    content: <CreateVariantDialog close={() => setOpen(false)} />,
    width: '600px',
  });

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  const allVariants = product.product_color.flatMap((pc) => pc.product_variant);
  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Icon icon="material-symbols:add-rounded" />}
        variant="contained"
      >
        Create Variant
      </Button>
      {createVariantDialog}
      <TableContainer>
        <Table aria-label="Variant Table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">RAM&nbsp;(GB)</TableCell>
              <TableCell align="right">Storage&nbsp;(GB)</TableCell>
              <TableCell align="right">Connectivity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVariants.map((variant) => (
              <TableRow
                key={variant.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {variant.sku}
                </TableCell>
                <TableCell align="right">
                  {variant.product_color?.name}
                </TableCell>
                <TableCell align="right">
                  {formatPrice(variant.price)}
                </TableCell>
                <TableCell align="right">{variant.ram?.capacity}</TableCell>
                <TableCell align="right">{variant.storage?.capacity}</TableCell>
                <TableCell align="right">
                  {variant.connectivity?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import CreateVariantDialog from '@/app/(main)/admin/products/[id]/variants/CreateVariantDialog';
import VariantRow from '@/app/(main)/admin/products/[id]/variants/VariantRow';
import useDialog from '@/src/hooks/useDialog';
import useProduct from '@/src/queries/products/useProduct';

export default function Variants() {
  const params = useParams<{ id: string }>();
  const { data: product, isPending, error } = useProduct(+params.id);
  const { dialog: createVariantDialog, setOpen } = useDialog({
    title: `Create ${product?.name} Variant`,
    content: <CreateVariantDialog close={() => setOpen(false)} />,
    width: '600px',
  });

  if (isPending) return <Loading />;
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
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVariants.map((variant) => (
              <VariantRow key={variant.id} variant={variant} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

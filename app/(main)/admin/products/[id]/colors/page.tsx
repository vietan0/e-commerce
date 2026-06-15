'use client';
import { Box, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import QueryError from '@/app/_components/QueryError';
import Color from '@/app/(main)/admin/products/[id]/colors/Color';
import useProduct from '@/src/queries/products/useProduct';

export default function Colors() {
  const params = useParams<{ id: string }>();
  const { data: product, isPending, error } = useProduct(params.id);
  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Stack direction="row" spacing={1}>
      {product.product_color.map((product_color) => (
        <Color key={product_color.id} product_color={product_color} />
      ))}
    </Stack>
  );
}

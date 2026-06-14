'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import useProducts from '@/src/queries/products/useProducts';

export default function ProductClient({ id }: { id: string }) {
  const { data: products, isPending, error } = useProducts({ sort: 'id' });
  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  const product = products.find((p) => p.id === +id)!;
  return (
    <div>
      <Typography>{product.name}</Typography>
      <Typography>{product.id}</Typography>
      <Typography>{product.brand?.name}</Typography>
      <Typography>{product.os?.name}</Typography>
      <Typography>Series: {product.product_series?.name}</Typography>
      {product.product_category.map((pc) => (
        <p key={pc.id}>{pc.category.name}</p>
      ))}
      <pre style={{ fontSize: 11 }}>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}

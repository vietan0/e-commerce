'use client';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from '@/app/_components/ProductCard';
import QueryError from '@/app/_components/QueryError';
import useResource from '@/src/queries/useResource';

export default function AllProducts() {
  const { data: products, isPending, error } = useResource('products');

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Box>
      <Typography gutterBottom variant="h3">
        AllProducts
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, 200px)',
          justifyContent: 'center',
          mx: 'auto',
        }}
      >
        {products.map((p) => (
          <ProductCard hasShadow={false} key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

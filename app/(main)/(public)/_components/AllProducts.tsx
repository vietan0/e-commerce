'use client';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from '@/app/_components/ProductCard';
import QueryError from '@/app/_components/QueryError';
import useProducts from '@/src/queries/products/useProducts';

export default function AllProducts() {
  const { data, isPending, error } = useProducts();

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
        {data.products.map((p) => (
          <ProductCard hasShadow={false} key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

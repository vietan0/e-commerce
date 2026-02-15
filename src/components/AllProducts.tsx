'use client';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from '@/src/components/ProductCard';
import useProducts from '@/src/queries/useProducts';

export default function AllProducts() {
  const { data, isPending, error } = useProducts();

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error.light">
        Error fetching products:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );
  }

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

'use client';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import useProjects from '@/queries/useProducts';

export default function ProductCarousel() {
  const { data, error } = useProjects();
  if (data)
    return (
      <Stack direction="row" spacing={1} sx={{ overflowX: 'scroll' }}>
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Stack>
    );

  if (error) return <Typography>Error fetching products.</Typography>;
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

'use client';

import { Box, CircularProgress, List, Typography } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import Product from '@/app/(main)/admin/products/_components/Product';
import useProducts from '@/src/queries/products/useProducts';

export default function ProductSidebar() {
  const { data: products, isPending, error } = useProducts({ sort: 'id' });
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
      <Typography color="textDisabled" sx={{ textAlign: 'center' }}>
        Searchbox product
      </Typography>
      <List>
        {products.map((product, i) => (
          <Product key={i} product={product} />
        ))}
      </List>
    </Box>
  );
}

'use client';

import { Box, CircularProgress, Divider, List, TextField } from '@mui/material';
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
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Search product"
          size="small"
          variant="outlined"
        />
      </Box>
      <Divider />
      <List>
        {products.map((product, i) => (
          <Product key={i} product={product} />
        ))}
      </List>
    </Box>
  );
}

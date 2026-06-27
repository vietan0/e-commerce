'use client';

import { Box, Divider, List, TextField } from '@mui/material';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import Product from '@/app/(main)/admin/products/_components/Product';
import useResource from '@/src/queries/useResource';

export default function ProductSidebar() {
  const {
    data: products,
    isPending,
    error,
  } = useResource('products', { sort: 'id' });

  if (isPending) return <Loading />;
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

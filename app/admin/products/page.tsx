import { Container, Typography } from '@mui/material';
import ProductTable from '@/app/admin/products/_components/ProductTable';
export default function Products() {
  return (
    <Container
      sx={{
        py: 3,
        pr: {
          xs: 0,
          sm: 0,
        },
      }}
    >
      <Typography variant="h5">Products</Typography>
      <ProductTable />
    </Container>
  );
}

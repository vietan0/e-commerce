import { Typography } from '@mui/material';
import ProductTable from '@/app/(main)/admin/products/_components/ProductTable';
export default function Products() {
  return (
    <>
      <Typography gutterBottom variant="h5">
        Products
      </Typography>
      <ProductTable />
    </>
  );
}

'use client';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ProductRow from '@/app/admin/products/_components/ProductRow';
import useProducts from '@/src/queries/products/useProducts';

export default function ProductTable() {
  const { data, isPending, error } = useProducts({ sort: 'id' });
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
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Base Price</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Discounts</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

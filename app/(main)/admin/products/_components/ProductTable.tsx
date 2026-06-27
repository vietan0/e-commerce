import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import ProductRow from '@/app/(main)/admin/products/_components/ProductRow';
import useResource from '@/src/queries/useResource';

export default function ProductTable() {
  // currently unused (0 references)
  const {
    data: products,
    isPending,
    error,
  } = useResource('products', { sort: 'id' });
  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Discounts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

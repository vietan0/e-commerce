'use client';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { use } from 'react';
import ImagesCarousel from '@/components/ImagesCarousel';
import formatPrice from '@/lib/price';
import useProduct from '@/queries/useProduct';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isPending, error } = useProduct(id);

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    return (
      <Typography color="error.light">
        Error fetching product with id {id}:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );
  }

  const {
    name,
    base_price,
    product_image,
    manufacturer,
    product_category,
    discount_product,
  } = product;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography>Giá sản phẩm</Typography>
          {base_price !== null && (
            <Typography
              color="grey.500"
              sx={{ textDecorationLine: 'line-through' }}
              variant="h6"
            >
              {formatPrice(base_price as unknown as string)}
            </Typography>
          )}
          <Typography variant="h5">final_price</Typography>
          <Typography>manufacturer.name: {manufacturer?.name}</Typography>
          {product_category.map(({ category }) => (
            <Chip key={category.id} label={category.name} sx={{ mr: 1 }} />
          ))}
          {/* <Typography>discount_product: {discount_product}</Typography> */}
          <ImagesCarousel images={product_image} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
          Right
        </Grid>
      </Grid>
    </Container>
  );
}

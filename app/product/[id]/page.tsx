'use client';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { use } from 'react';
import ImagesCarousel from '@/components/ImagesCarousel';
import formatPrice from '@/lib/formatPrice';
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

  if (error)
    return <Typography>Error fetching product with id {id}</Typography>;

  const {
    name,
    base_price,
    final_price,
    description,
    thumbnail,
    stock,
    manufacturer_id,
    manufacturer_name,
    images,
    discount_name,
    discount_value,
    discount_type_name,
  } = product;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography>Giá sản phẩm</Typography>
          {base_price !== final_price && (
            <Typography
              color="grey.500"
              sx={{ textDecorationLine: 'line-through' }}
              variant="h6"
            >
              {formatPrice(base_price)}
            </Typography>
          )}
          <Typography variant="h5">{formatPrice(final_price)}</Typography>
          <Typography>manufacturer_name: {manufacturer_name}</Typography>
          <Typography>discount_name: {discount_name}</Typography>
          <Typography>discount_value: {discount_value}</Typography>
          <Typography>discount_type_name: {discount_type_name}</Typography>
          <ImagesCarousel images={images} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
          Right
        </Grid>
      </Grid>
    </Container>
  );
}

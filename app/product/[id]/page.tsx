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
    price,
    description,
    thumbnail,
    stock,
    manufacturer_id,
    category_name,
    manufacturer_name,
    images,
  } = product;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography>Giá sản phẩm</Typography>
          <Typography variant="h5">{formatPrice(price)}</Typography>
          <Typography>{manufacturer_name}</Typography>
          <Typography>{category_name}</Typography>
          <ImagesCarousel images={images} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
          Right
        </Grid>
      </Grid>
    </Container>
  );
}

'use client';
import { Box, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import { use } from 'react';
import ImagesCarousel from '@/src/components/ImagesCarousel';
import formatPrice from '@/src/lib/price';
import useProduct from '@/src/queries/useProduct';

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
    final_price,
    product_image,
    manufacturer,
    product_category,
    discount_product,
  } = product;
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography>Giá sản phẩm</Typography>
        {(base_price as unknown as string) !== final_price && (
          <Typography
            color="grey.500"
            sx={{ textDecorationLine: 'line-through' }}
            variant="h6"
          >
            {formatPrice(base_price as unknown as string)}
          </Typography>
        )}
        <Typography variant="h5">{formatPrice(final_price)}</Typography>
        <Typography>manufacturer.name: {manufacturer?.name}</Typography>
        <Box sx={{ mb: 1 }}>
          {product_category.map(({ category }) => (
            <Chip key={category.id} label={category.name} sx={{ mr: 1 }} />
          ))}
        </Box>
        <Box sx={{ mb: 1 }}>
          {discount_product.map(({ discount }) =>
            discount ? (
              <Chip key={discount.id} label={discount.name} sx={{ mr: 1 }} />
            ) : null,
          )}
        </Box>
        <ImagesCarousel images={product_image} />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
        Right
      </Grid>
    </Grid>
  );
}

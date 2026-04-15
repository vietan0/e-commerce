'use client';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useCounter } from 'react-use';
import ImagesCarousel from '@/app/_components/ImagesCarousel';
import QueryError from '@/app/_components/QueryError';
import QuantityStepper from '@/app/(main)/(public)/product/[id]/_components/QuantityStepper';
import { formatPrice } from '@/src/lib/price';
import useUpsertCartItem from '@/src/queries/cart/useUpsertCartItem';
import useProduct from '@/src/queries/products/useProduct';

export default function ProductClient({ id }: { id: string }) {
  const { data: product, isPending, error } = useProduct(id);
  const [quantity, { inc, dec }] = useCounter(1, product?.stock, 1);
  const createCartItem = useUpsertCartItem();
  const t = useTranslations('product');

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;

  const {
    name,
    base_price,
    final_price,
    product_image,
    manufacturer,
    product_category,
    discount_product,
    description,
    stock,
  } = product;
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography>{t('Price')}</Typography>
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
        <MdPreview
          style={{ fontFamily: 'geistSans' }}
          value={description || ''}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
          <QuantityStepper dec={dec} inc={inc} value={quantity} />
          <Typography variant="body2">
            {t('Stock available', { count: stock })}
          </Typography>
        </Stack>
        <Button
          loading={createCartItem.isPending}
          onClick={() =>
            createCartItem.mutate({ quantity: quantity, productId: id })
          }
          startIcon={
            <Icon icon="material-symbols:add-shopping-cart-outline-rounded" />
          }
          variant="contained"
        >
          {t('Add to Cart')}
        </Button>
      </Grid>
    </Grid>
  );
}

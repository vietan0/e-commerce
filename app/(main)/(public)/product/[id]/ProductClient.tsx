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
import QueryError from '@/app/_components/QueryError';
import QuantityStepper from '@/app/(main)/(public)/product/[id]/_components/QuantityStepper';
import useUpsertCartItem from '@/src/queries/cart/useUpsertCartItem';
import useProduct from '@/src/queries/products/useProduct';

export default function ProductClient({ id }: { id: string }) {
  const { data: product, isPending, error } = useProduct(id);
  const [quantity, { inc, dec }] = useCounter(
    1,
    0 /* used to be product.stock */,
    1,
  );
  const createCartItem = useUpsertCartItem();
  const t = useTranslations('product');

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;

  const { name, product_category, description } = product;
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography>{t('Price')}</Typography>
        <Box sx={{ mb: 1 }}>
          product_color:
          {product.product_color.map((productColor) => (
            <Chip
              key={productColor.id}
              label={productColor.name}
              sx={{ mr: 1 }}
            />
          ))}
          {product.product_color.map((productColor) => (
            <pre key={productColor.id}>
              {JSON.stringify(productColor.product_variant)}
            </pre>
          ))}
        </Box>
        {/* {(base_price as unknown as string) !== final_price && (
          <Typography
            color="grey.500"
            sx={{ textDecorationLine: 'line-through' }}
            variant="h6"
          >
            {formatPrice(base_price as unknown as string)}
          </Typography>
        )}
        <Typography variant="h5">{formatPrice(final_price)}</Typography> */}
        <Box sx={{ mb: 1 }}>
          product_category:
          {product_category.map(({ category }) => (
            <Chip key={category.id} label={category.name} sx={{ mr: 1 }} />
          ))}
        </Box>

        {/* <ImagesCarousel images={product_image} /> */}
        <MdPreview
          style={{ fontFamily: 'geistSans' }}
          value={description || ''}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} sx={{ border: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
          <QuantityStepper dec={dec} inc={inc} value={quantity} />
          <Typography variant="body2">
            {t('Stock available', { count: 0 /* stock */ })}
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

import { Grid, Link, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';
import { formatPrice } from '@/src/lib/price';

export default function CheckoutCartItem({
  cart_item,
}: {
  cart_item: cart_itemGetPayload<{
    include: { product: true };
  }>;
}) {
  const { product, quantity } = cart_item;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        '& .MuiTypography-root': {
          fontSize: 'inherit', // override each <Typography /> inside
        },
        alignItems: 'center',
        fontSize: 14,
      }}
    >
      <Grid size={6}>
        <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
          <Image alt="Product thumbnail" height={64} src="" width={64} />
          <Link
            color="inherit"
            component={NextLink}
            href={`/product/${product.id}`}
            underline="hover"
          >
            {product.name}
          </Link>
        </Stack>
      </Grid>
      <Grid size={2}>
        <Stack sx={{ alignItems: 'end' }}>
          {/* @ts-expect-error */}
          {product.base_price !== product.final_price && (
            <Typography
              color="grey.500"
              sx={{ textDecorationLine: 'line-through' }}
              variant="body2"
            >
              {formatPrice(String(product.base_price))}
            </Typography>
          )}
          {/* @ts-expect-error */}
          <Typography>{formatPrice(product.final_price)}</Typography>
        </Stack>
      </Grid>
      <Grid size={2}>
        <Typography sx={{ textAlign: 'center' }}>{quantity}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography sx={{ textAlign: 'end' }}>
          {/* @ts-expect-error */}
          {formatPrice(product.final_price * quantity)}
        </Typography>
      </Grid>
    </Grid>
  );
}

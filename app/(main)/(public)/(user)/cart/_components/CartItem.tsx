import { Icon } from '@iconify/react';
import { Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import QuantityStepper from '@/app/(main)/(public)/(user)/cart/_components/QuantityStepper';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';
import { formatPrice } from '@/src/lib/price';
import useDeleteCartItem from '@/src/queries/cart/useDeleteCartItem';

export default function CartItem({
  cart_item,
}: {
  cart_item: cart_itemGetPayload<{
    include: { product: { include: { thumbnail: true } } };
  }>;
}) {
  const { id, product, quantity } = cart_item;
  const deleteCartItem = useDeleteCartItem();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        '& .MuiTypography-root': {
          fontSize: 'inherit', // override each <Typography /> inside
        },
        px: 2,
        alignItems: 'center',
        fontSize: 14,
      }}
    >
      <Grid size={5}>
        <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
          <Image
            alt="Product thumbnail"
            height={64}
            src={product.thumbnail?.url || ''}
            width={64}
          />
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
      <Grid size={1.5}>
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
      <Grid size={1.5}>
        <QuantityStepper cart_item={cart_item} />
      </Grid>
      <Grid size={1.5}>
        <Typography sx={{ textAlign: 'end' }}>
          {/* @ts-expect-error */}
          {formatPrice(product.final_price * quantity)}
        </Typography>
      </Grid>
      <Grid size={2.5} sx={{ textAlign: 'end' }}>
        <IconButton
          aria-label="Xoá khỏi giỏ hàng"
          color="error"
          loading={deleteCartItem.isPending}
          onClick={() => deleteCartItem.mutate(String(id))}
          title="Xoá khỏi giỏ hàng"
        >
          <Icon icon="material-symbols:delete-outline-rounded" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

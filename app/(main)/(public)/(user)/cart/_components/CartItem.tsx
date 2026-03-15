import { Icon } from '@iconify/react';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
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
  const { id, product, amount } = cart_item;
  const deleteCartItem = useDeleteCartItem();

  return (
    <Grid
      container
      spacing={1}
      sx={{
        '& .MuiTypography-root': {
          fontSize: 'inherit', // override each <Typography /> inside
        },
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
          <Typography>{product.name}</Typography>
        </Stack>
      </Grid>
      <Grid size={1.5}>
        {/* @ts-expect-error */}
        <Typography>{formatPrice(product.final_price)}</Typography>
      </Grid>
      <Grid size={1.5}>
        <QuantityStepper cart_item={cart_item} />
      </Grid>
      <Grid size={1.5}>
        {/* @ts-expect-error */}
        <Typography>{formatPrice(product.final_price * amount)}</Typography>
      </Grid>
      <Grid>
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

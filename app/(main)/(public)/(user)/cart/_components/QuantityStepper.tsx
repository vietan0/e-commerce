import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography } from '@mui/material';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';
import useUpdateCartItem from '@/src/queries/cart/useUpdateCartItem';

export default function QuantityStepper({
  cart_item,
}: {
  cart_item: cart_itemGetPayload<{
    include: {
      product_variant: {
        include: {
          product_color: {
            include: {
              product: true;
            };
          };
        };
      };
    };
  }>;
}) {
  const { id, quantity } = cart_item;
  const updateCartItem = useUpdateCartItem();
  return (
    <Stack
      direction="row"
      sx={{
        mx: 'auto',
        maxWidth: 100,
        border: 1,
        borderRadius: 2,
        borderColor: 'grey.400',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton
        aria-label="Decrease by 1"
        loading={updateCartItem.isPending}
        onClick={() => {
          updateCartItem.mutate({ id, action: 'decrement', quantity: 1 });
        }}
        size="small"
        sx={{
          borderRadius: 0,
          flexGrow: 1,
        }}
      >
        <Icon fontSize={16} icon="material-symbols:remove-rounded" />
      </IconButton>
      <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
        {quantity}
      </Typography>
      <IconButton
        aria-label="Increase by 1"
        loading={updateCartItem.isPending}
        onClick={() => {
          updateCartItem.mutate({ id, action: 'increment', quantity: 1 });
        }}
        size="small"
        sx={{
          borderRadius: 0,
          flexGrow: 1,
        }}
      >
        <Icon fontSize={16} icon="material-symbols:add-rounded" />
      </IconButton>
    </Stack>
  );
}

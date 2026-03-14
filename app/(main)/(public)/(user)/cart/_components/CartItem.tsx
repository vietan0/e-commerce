import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';
import { formatPrice } from '@/src/lib/price';

export default function CartItem({
  cart_item,
}: {
  cart_item: cart_itemGetPayload<{
    include: { product: { include: { thumbnail: true } } };
  }>;
}) {
  const { product, amount } = cart_item;

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
      <Grid size={2}>
        {/* @ts-expect-error */}
        <Typography>{formatPrice(product.final_price)}</Typography>
      </Grid>
      <Grid size={1.5}>
        <Stack
          direction="row"
          sx={{
            // flexGrow: 0,
            // flexShrink: 1,
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
            size="small"
            sx={{
              borderRadius: 0,
              flexGrow: 1,
            }}
          >
            <Icon fontSize={16} icon="material-symbols:remove-rounded" />
          </IconButton>
          <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
            {amount}
          </Typography>
          <IconButton
            aria-label="Increase by 1"
            size="small"
            sx={{
              borderRadius: 0,
              flexGrow: 1,
            }}
          >
            <Icon fontSize={16} icon="material-symbols:add-rounded" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid size={2}>
        {/* @ts-expect-error */}
        <Typography>{formatPrice(product.final_price * amount)}</Typography>
      </Grid>
      <Grid>
        <Button color="error">Xoá</Button>
      </Grid>
    </Grid>
  );
}

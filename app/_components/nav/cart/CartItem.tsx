import { Grid, MenuItem, Typography } from '@mui/material';
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
    <MenuItem dense>
      <Grid
        container
        spacing={0.5}
        sx={{ alignItems: 'center', flexGrow: 1 }}
        title={product.name}
      >
        <Grid sx={{ lineHeight: 0 }}>
          <Image
            alt="Product thumbnail"
            height={40}
            src={product.thumbnail?.url || ''}
            width={40}
          />
        </Grid>
        <Grid size="grow">
          <Typography
            sx={{
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            variant="inherit"
          >
            {product.name}
          </Typography>
        </Grid>
        <Grid size={1}>
          <Typography
            sx={{ fontSize: 14, textAlign: 'right' }}
            variant="inherit"
          >
            {amount}
          </Typography>
        </Grid>
        <Grid size={4}>
          <Typography
            sx={{ fontSize: 14, textAlign: 'right' }}
            variant="inherit"
          >
            {/* @ts-expect-error */}
            {formatPrice(product.final_price * amount)}
          </Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
}

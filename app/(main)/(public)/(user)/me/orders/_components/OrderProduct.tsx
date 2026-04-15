import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { placeholderImg } from '@/src/constants/ui';
import type { order_productGetPayload } from '@/src/generated/prisma/models';
import type { orderProductInclude } from '@/src/lib/commonIncludes';
import { formatPrice } from '@/src/lib/price';

export default function OrderProduct({
  order_product,
}: {
  order_product: order_productGetPayload<{
    include: typeof orderProductInclude;
  }>;
}) {
  return (
    <Stack
      component={NextLink}
      direction="row"
      href={`/product/${order_product.product.id}`}
      spacing={2}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Image
        alt="Product thumbnail"
        height={70}
        src={order_product.product.thumbnail?.url || placeholderImg}
        width={70}
      />
      <Box>
        <Typography sx={{ fontWeight: 700 }}>
          {order_product.product.name}
        </Typography>
        <Typography color="grey.600" variant="body2">
          x{order_product.quantity}
        </Typography>
        <Typography sx={{ fontWeight: 700 }} variant="body2">
          {formatPrice(order_product.unit_price.toString())}
        </Typography>
      </Box>
    </Stack>
  );
}

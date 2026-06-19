import { Card, CardContent, Typography } from '@mui/material';
import type { product_colorGetPayload } from '@/src/generated/prisma/models';

export default function Color({
  product_color,
}: {
  product_color: product_colorGetPayload<{
    include: {
      product_color_image: true;
      product_variant: {
        include: {
          ram: true;
          connectivity: true;
          storage: true;
        };
      };
    };
  }>;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>{product_color.name}</Typography>
      </CardContent>
    </Card>
  );
}

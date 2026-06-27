import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import ColorDialog from '@/app/(main)/admin/products/[id]/colors/_components/ColorDialog';
import type { product_colorGetPayload } from '@/src/generated/prisma/models';
import useDialog from '@/src/hooks/useDialog';
import type { includeColor } from '@/src/lib/commonIncludes';

export default function Color({
  product_color,
}: {
  product_color: product_colorGetPayload<typeof includeColor.product_color>;
}) {
  const { dialog: colorDialog, setOpen } = useDialog({
    title: (
      <>
        {`${product_color.name} - Images`}
        <Typography color="textSecondary">
          {product_color.product.name}
        </Typography>
      </>
    ),
    content: (
      <ColorDialog close={() => setOpen(false)} product_color={product_color} />
    ),
    width: '800px',
  });

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => setOpen(true)}>
        <CardContent>
          <Typography>{product_color.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {product_color.product_color_image.length} images
          </Typography>
        </CardContent>
      </CardActionArea>
      {colorDialog}
    </Card>
  );
}

import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import Image from 'next/image';
import ImageViewer from '@/app/(main)/admin/products/[id]/colors/_components/ImageViewer';
import { placeholderImg } from '@/src/constants/ui';
import type { product_color_imageGetPayload } from '@/src/generated/prisma/models';
import useDialog from '@/src/hooks/useDialog';
import useSetProductColorThumbnail from '@/src/queries/product-color-images/useSetProductColorThumbnail';
import useUpdateProductColorImage from '@/src/queries/product-color-images/useUpdateProductColorImage';
import useDeleteResource from '@/src/queries/useDeleteResource';

export default function ProductColorImage({
  image,
}: {
  image: product_color_imageGetPayload<{
    include: { file: true; product_color: true };
  }>;
}) {
  const { dialog: viewImageDialog, setOpen } = useDialog({
    content: <ImageViewer image={image}></ImageViewer>,
  });

  const size = 150;

  const setProductColorThumbnail = useSetProductColorThumbnail();
  const updateProductColorImage = useUpdateProductColorImage();
  const deleteProductColorImage = useDeleteResource('product-color-images', [
    ['product', image.product_color.product_id],
  ]);

  function deleteImage() {
    deleteProductColorImage.mutate(image.id);
  }

  function thumbnailOff() {
    updateProductColorImage.mutate({
      id: image.id.toString(),
      data: { is_thumbnail: false },
    });
  }

  function thumbnailOn() {
    setProductColorThumbnail.mutate({
      id: image.id.toString(),
      product_color_id: image.product_color_id,
    });
  }

  return (
    <Box>
      <Card
        sx={{
          maxWidth: size,
          position: 'relative',
          border: 1,
          borderColor: 'grey.400',
          borderRadius: 2,
          boxShadow: 0,
          overflow: 'hidden',
          backgroundColor: 'grey.200',
        }}
      >
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia>
            <Image
              alt={image.file.url}
              height={size}
              src={image.file.url || placeholderImg}
              style={{ display: 'block', objectFit: 'contain' }}
              width={size}
            />
          </CardMedia>
        </CardActionArea>
        {viewImageDialog}
        <IconButton
          color="error"
          onClick={deleteImage}
          size="small"
          sx={{
            position: 'absolute',
            right: 3,
            top: 3,
            backgroundColor: red[50],
            border: 1,
            borderColor: red[200],
            '&:hover': {
              backgroundColor: red[100],
            },
          }}
        >
          <Icon
            icon={
              deleteProductColorImage.isPending
                ? 'svg-spinners:180-ring'
                : 'material-symbols:delete-outline-rounded'
            }
          />
        </IconButton>
      </Card>
      <FormControlLabel
        control={
          <Checkbox
            checked={image.is_thumbnail}
            onChange={(_e, checked) =>
              checked ? thumbnailOn() : thumbnailOff()
            }
            size="small"
          />
        }
        label="Thumbnail"
        slotProps={{
          typography: {
            variant: 'body2',
          },
        }}
      />
    </Box>
  );
}

import { Icon } from '@iconify/react';
import { IconButton, Stack } from '@mui/material';
import { red } from '@mui/material/colors';
import Image from 'next/image';
import { placeholderImg } from '@/src/constants/ui';
import type { product_color_imageGetPayload } from '@/src/generated/prisma/models';
import useDeleteProductColorImage from '@/src/queries/product-color-images/useDeleteProductColorImage';

export default function ProductColorImage({
  image,
}: {
  image: product_color_imageGetPayload<{ include: { file: true } }>;
}) {
  const deleteProductColorImage = useDeleteProductColorImage();

  function deleteImage() {
    deleteProductColorImage.mutate(image.id.toString());
  }

  return (
    <Stack
      sx={{
        position: 'relative',
        border: 1,
        borderColor: 'grey.400',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'grey.200',
      }}
    >
      <Image
        alt={image.file.url}
        height={120}
        src={image.file.url || placeholderImg}
        style={{ objectFit: 'contain' }}
        width={120}
      />
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
    </Stack>
  );
}

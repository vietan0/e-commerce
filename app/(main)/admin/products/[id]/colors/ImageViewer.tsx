import { Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import { placeholderImg } from '@/src/constants/ui';
import type { product_color_imageGetPayload } from '@/src/generated/prisma/models';
import useSetProductColorThumbnail from '@/src/queries/product-color-images/useSetProductColorThumbnail';
import useUpdateProductColorImage from '@/src/queries/product-color-images/useUpdateProductColorImage';

export default function ImageViewer({
  image,
}: {
  image: product_color_imageGetPayload<{ include: { file: true } }>;
}) {
  const setProductColorThumbnail = useSetProductColorThumbnail();
  const updateProductColorImage = useUpdateProductColorImage();
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
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={image.is_thumbnail}
            onChange={(_e, checked) => {
              if (checked) {
                thumbnailOn();
              } else {
                thumbnailOff();
              }
            }}
          />
        }
        label="Thumbnail"
      />
      <Image
        alt={image.file.url}
        height={1000}
        src={image.file.url || placeholderImg}
        style={{ maxWidth: '100%', maxHeight: '50vh', objectFit: 'contain' }}
        width={1000}
      />
    </div>
  );
}

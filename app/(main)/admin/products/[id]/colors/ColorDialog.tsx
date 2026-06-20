import { Icon } from '@iconify/react';
import { Box, Button, DialogActions, Stack, Typography } from '@mui/material';
import { type ChangeEvent, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import ProductColorImage from '@/app/(main)/admin/products/[id]/colors/ProductColorImage';
import type { product_colorGetPayload } from '@/src/generated/prisma/models';
import type { includeColor } from '@/src/lib/commonIncludes';
import useCreateProductColorImages from '@/src/queries/product-color-images/useCreateProductColorImages';

export default function ColorDialog({
  product_color,
  close,
}: {
  product_color: product_colorGetPayload<typeof includeColor.product_color>;
  close: () => void;
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node?.parentElement?.parentElement ?? null);
  }, []);

  const createProductColorImages = useCreateProductColorImages();
  async function onImagesSelected(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append('product_color_id', product_color.id.toString());

    for (const file of Array.from(files)) {
      formData.append('file', file);
    }

    createProductColorImages.mutate(formData);
  }
  return (
    <Box ref={setRef}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
        <Button
          component="label"
          loading={createProductColorImages.isPending}
          startIcon={<Icon icon="material-symbols:upload-rounded" />}
          variant="contained"
        >
          Upload Images
          <VisuallyHiddenInput
            accept="image/*"
            multiple
            onChange={onImagesSelected}
            type="file"
          />
        </Button>
        {createProductColorImages.error && (
          <Typography color="error" variant="body2">
            {createProductColorImages.error.message}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1}>
        {product_color.product_color_image.map((image) => (
          <ProductColorImage image={image} key={image.id} />
        ))}
      </Stack>
      {container &&
        createPortal(
          <DialogActions>
            <Button color="inherit" onClick={close}>
              Close
            </Button>
          </DialogActions>,
          container,
        )}
    </Box>
  );
}

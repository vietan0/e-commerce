'use client';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import QueryError from '@/app/_components/QueryError';
import Color from '@/app/(main)/admin/products/[id]/colors/_components/Color';
import CreateColorDialog from '@/app/(main)/admin/products/[id]/colors/_components/CreateColorDialog';
import useDialog from '@/src/hooks/useDialog';
import useProduct from '@/src/queries/products/useProduct';

export default function Colors() {
  const params = useParams<{ id: string }>();
  const { data: product, isPending, error } = useProduct(+params.id);

  const { dialog: addColorDialog, setOpen } = useDialog({
    title: 'Add Color',
    content: <CreateColorDialog close={() => setOpen(false)} />,
    width: '600px',
  });

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Icon icon="material-symbols:add-rounded" />}
        sx={{ mb: 2 }}
        variant="contained"
      >
        Add Color
      </Button>
      {addColorDialog}
      <Stack direction="row" spacing={1}>
        {product.product_color.map((product_color) => (
          <Color key={product_color.id} product_color={product_color} />
        ))}
      </Stack>
    </Box>
  );
}

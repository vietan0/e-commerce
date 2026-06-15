'use client';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import QueryError from '@/app/_components/QueryError';
import CreateVariantDialog from '@/app/(main)/admin/products/[id]/variants/CreateVariantDialog';
import useDialog from '@/src/hooks/useDialog';
import useProduct from '@/src/queries/products/useProduct';

export default function Variants() {
  const params = useParams<{ id: string }>();
  const { data: product, isPending, error } = useProduct(params.id);
  const { dialog: createVariantDialog, setOpen } = useDialog({
    title: `Create ${product?.name} Variant`,
    content: <CreateVariantDialog close={() => setOpen(false)} />,
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

  const allVariants = product.product_color.flatMap((pc) => pc.product_variant);
  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Icon icon="material-symbols:add-rounded" />}
        variant="contained"
      >
        Create Variant
      </Button>
      {createVariantDialog}
      <Stack spacing={1}>
        <pre>{JSON.stringify(allVariants, null, 2)}</pre>
      </Stack>
    </Box>
  );
}

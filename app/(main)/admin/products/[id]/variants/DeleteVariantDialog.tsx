import { Button, DialogActions, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { product_variantGetPayload } from '@/src/generated/prisma/models';
import type { includeVariant } from '@/src/lib/commonIncludes';
import useDeleteProductVariant from '@/src/queries/products/useDeleteVariant';

export default function DeleteVariantDialog({
  variant,
  close,
}: {
  variant: product_variantGetPayload<{
    include: typeof includeVariant;
  }>;
  close: () => void;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<Element | null>(null);
  const deleteProductVariant = useDeleteProductVariant();

  function confirmDelete() {
    deleteProductVariant.mutate(variant.id.toString(), {
      onSuccess: () => {
        close(); // onSuccess in mutate runs after onSuccess in useMutation
      },
    });
  }

  useEffect(() => {
    setTarget(anchorRef.current?.parentElement?.parentElement ?? null);
  }, []);

  return (
    <div ref={anchorRef}>
      {target &&
        createPortal(
          <DialogActions>
            {deleteProductVariant.error && (
              <Typography color="error" variant="body2">
                {deleteProductVariant.error.message}
              </Typography>
            )}
            <Button color="inherit" onClick={close}>
              Cancel
            </Button>
            <Button
              color="error"
              loading={deleteProductVariant.isPending}
              onClick={confirmDelete}
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>,
          target,
        )}
    </div>
  );
}

import {
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import useCreateResource from '@/src/queries/useCreateResource';

interface CreateProductColorFields {
  product_id: number;
  name: string;
}

export default function CreateColorDialog({ close }: { close: () => void }) {
  const params = useParams<{ id: string }>();
  const defaultValues: Partial<CreateProductColorFields> = {
    product_id: +params.id,
    name: '',
  };

  const { control, handleSubmit, formState, subscribe } =
    useForm<CreateProductColorFields>({
      defaultValues,
    });

  // const formDataLive = useWatch({ control }); // for debug rendering

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values);
      },
    });

    return () => callback();
  }, [subscribe]);

  const createProductVariant = useCreateResource('product-colors', [
    ['product', +params.id],
  ]);
  const onSubmit: SubmitHandler<CreateProductColorFields> = (formData) => {
    createProductVariant.mutate(formData, {
      onSuccess: () => close(),
    });
  };

  const anchorRef = useRef<HTMLFormElement>(null);
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(anchorRef.current?.parentElement?.parentElement ?? null);
  }, []);
  return (
    <Grid
      component="form"
      container
      onSubmit={handleSubmit(onSubmit)}
      ref={anchorRef}
      spacing={2}
    >
      <Grid size="grow">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              fullWidth
              helperText={error?.message}
              label="Name"
              size="small"
            />
          )}
          rules={{ required: 'SKU is required' }}
        />
      </Grid>

      <DevT control={control} />
      {target &&
        createPortal(
          <DialogActions>
            {createProductVariant.error && (
              <Typography color="error" variant="body2">
                {createProductVariant.error.message}
              </Typography>
            )}
            <Button color="inherit" onClick={close}>
              Cancel
            </Button>
            <Button
              disabled={!formState.isValid}
              loading={createProductVariant.isPending}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>,
          target,
        )}
    </Grid>
  );
}

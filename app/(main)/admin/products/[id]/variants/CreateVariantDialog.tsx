import {
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import AppSelect from '@/app/(main)/admin/products/_components/AppSelect';
import useCreateProductVariant from '@/src/queries/products/useCreateVariant';

interface CreateVariantFields {
  product_color_id: number;
  sku: string;
  price: string;
  storage_id?: number;
  ram_id?: number;
  connectivity_id?: number;
}

export default function CreateVariantDialog({ close }: { close: () => void }) {
  const id = useId();

  const defaultValues: Partial<CreateVariantFields> = {
    product_color_id: undefined,
    sku: '',
    price: '',
    storage_id: undefined,
    ram_id: undefined,
    connectivity_id: undefined,
  };

  const { control, handleSubmit, formState, subscribe } =
    useForm<CreateVariantFields>({
      defaultValues,
    });

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

  const createProductVariant = useCreateProductVariant();
  const onSubmit: SubmitHandler<CreateVariantFields> = (formData) => {
    console.log('Submitted variant data:', formData);
    createProductVariant.mutate(
      { data: formData },
      {
        onSuccess: () => {
          close(); // onSuccess in mutate runs after onSuccess in useMutation
        },
      },
    );
  };

  return (
    <Grid
      component="form"
      container
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Grid size={4}>
        <Controller
          control={control}
          name="product_color_id"
          render={({ field }) => (
            <AppSelect
              {...field}
              endpoint="product-colors"
              fullWidth
              label="Color"
              labelId="product-colors"
            />
          )}
          rules={{ required: 'Color is required' }}
        />
      </Grid>
      <Grid size={8}>
        <Controller
          control={control}
          name="sku"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              fullWidth
              helperText={error?.message}
              label="SKU"
              size="small"
            />
          )}
          rules={{ required: 'SKU is required' }}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="price"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              fullWidth
              helperText={error?.message}
              label="Price"
              size="small"
              type="number"
            />
          )}
          rules={{ required: 'Price is required' }}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="ram_id"
          render={({ field }) => (
            <AppSelect
              {...field}
              endpoint="rams"
              label="RAM"
              renderLabel={(x) => `${x.capacity}GB`}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="storage_id"
          render={({ field }) => (
            <AppSelect
              {...field}
              endpoint="storages"
              label="Storage"
              renderLabel={(x) => `${x.capacity}GB`}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="connectivity_id"
          render={({ field }) => (
            <AppSelect
              {...field}
              endpoint="connectivities"
              label="Connectivity"
            />
          )}
        />
      </Grid>
      <DevT control={control} />
      {document.getElementById(id) &&
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
              Create Variant
            </Button>
          </DialogActions>,
          document.getElementById(id)!.parentElement!.parentElement!,
        )}
    </Grid>
  );
}

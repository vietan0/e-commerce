import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  type SelectProps,
  TextField,
} from '@mui/material';
import { MdEditor } from 'md-editor-rt';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import AppSelect from '@/app/(main)/admin/products/_components/AppSelect';
import CategoriesSelect from '@/app/(main)/admin/products/_components/CategoriesSelect';
import useCreateProduct from '@/src/queries/products/useCreateProduct';

interface CreateProductFields {
  name: string;
  description?: string;
  brand_id?: number;
  product_series_id?: number;
  os_id?: number;
  cpu_id?: number;
  gpu_id?: number;
  sim_id?: number;
  camera_system_id?: number;
  network_technology_id?: number;
  charging_technology_id?: number;
  ip_rating_id?: number;
  categories: string[];
}

export default function CreateProductForm({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const defaultValues: Partial<CreateProductFields> = {
    name: '',
    description: '',
    brand_id: undefined,
    product_series_id: undefined,
    os_id: undefined,
    cpu_id: undefined,
    gpu_id: undefined,
    sim_id: undefined,
    camera_system_id: undefined,
    network_technology_id: undefined,
    charging_technology_id: undefined,
    ip_rating_id: undefined,
    categories: [],
  };
  const { control, handleSubmit, register, setValue } =
    useForm<CreateProductFields>({
      defaultValues,
    });

  // this local state is only here to sync MD Editor with MD Preview,
  // not doing anything with React Hook Form
  const [text, setText] = useState(defaultValues.description);

  const createProduct = useCreateProduct();

  const onSubmit: SubmitHandler<CreateProductFields> = (formData) => {
    console.log('formData', formData);
    createProduct.mutate({ data: formData });
  };
  const selectProps: SelectProps = {
    fullWidth: true,
  };
  const formId = 'create-product-form';
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            minWidth: 300,
            maxWidth: 1000,
            width: '80%',
          },
        },
      }}
    >
      <DialogTitle>Create Product</DialogTitle>
      <DialogContent sx={{ overflow: 'initial' }}>
        <Grid
          component="form"
          container
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
        >
          <Grid size={8}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  required
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid size={4}>
            <Controller
              control={control}
              name="brand_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="brands"
                  label="Brand"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="product_series_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="product-series"
                  label="Product Series"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="os_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="os"
                  label="OS"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="cpu_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="cpus"
                  label="CPU"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="gpu_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="gpus"
                  label="GPU"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="sim_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="sims"
                  label="SIM"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="camera_system_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="camera-systems"
                  label="Camera System"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="network_technology_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="network-technologies"
                  label="Network Technology"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="charging_technology_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="charging-technologies"
                  label="Charging Technology"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              control={control}
              name="ip_rating_id"
              render={({ field }) => (
                <AppSelect
                  {...field}
                  {...selectProps}
                  endpoint="ip-ratings"
                  label="IP Rating"
                />
              )}
            />
          </Grid>
          <Grid size={8}>
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <CategoriesSelect
                  {...field}
                  fullWidth
                  onChange={(e) => {
                    const value = e.target.value as string[];
                    const sortedValue = value.sort(
                      (a, b) => Number(a) - Number(b),
                    );
                    field.onChange(sortedValue);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <InputLabel>Description</InputLabel>
            <MdEditor
              language="en-US"
              onChange={(val) => {
                setValue('description', val === '' ? undefined : val, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                setText(val);
              }}
              placeholder="Write the description for this product..."
              style={{
                fontFamily: 'geistSans',
                height: 400,
              }}
              value={text || ''}
            />
            {/* this is only for RHF Devtools, unused otherwise */}
            <VisuallyHiddenInput {...register('description')} />
          </Grid>
          <DevT control={control} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          form={formId}
          loading={createProduct.isPending}
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

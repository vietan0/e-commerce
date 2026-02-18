import { DevTool } from '@hookform/devtools';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import CategoriesSelect from '@/app/admin/products/_components/CategoriesSelect';
import ManufacturerSelect from '@/app/admin/products/_components/ManufacturerSelect';
import theme from '@/app/theme';
import VisuallyHiddenInput from '@/src/components/VisuallyHiddenInput';
import { formatPrice, stripFormat } from '@/src/lib/price';
import type { Product } from '@/src/types';

interface IFormInputs {
  id: string;
  name: string;
  base_price: string;
  stock: string;
  manufacturer_id: string;
  categories: string[];
  thumbnail: FileList;
}
export default function ProductEditForm({
  product,
  open,
  handleClose,
}: {
  product: Product;
  open: boolean;
  handleClose: () => void;
}) {
  const {
    id,
    name,
    base_price,
    stock,
    manufacturer_id,
    product_category,
    thumbnail,
  } = product;

  const defaultValues = {
    id: (id as unknown as string) || '',
    name: name || '',
    base_price: formatPrice(base_price as unknown as string, {
      hasUnit: false,
    }),
    stock: String(stock) || '',
    manufacturer_id: String(manufacturer_id),
    categories: product_category.map((pc) => String(pc.category_id)),
    thumbnail: new DataTransfer().files, // an empty FileList[]
  };

  const {
    control,
    handleSubmit,
    register,
    formState,
    watch,
    resetField,
    reset,
  } = useForm<IFormInputs>({
    defaultValues,
  });

  const thumbnailVal = watch('thumbnail');
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            minWidth: 300,
            maxWidth: 700,
            width: '75%',
          },
        },
      }}
    >
      <DialogTitle>Edit Product: {name}</DialogTitle>
      <DialogContent sx={{ overflow: 'initial' }}>
        <Stack spacing={2}>
          <Grid
            component="form"
            container
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid size="grow">
              <Controller
                control={control}
                name="id"
                render={({ field }) => (
                  <TextField {...field} disabled label="ID" size="small" />
                )}
              />
            </Grid>
            <Grid size={10}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Name" size="small" />
                )}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                control={control}
                name="base_price"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    inputMode="numeric"
                    label="Base Price"
                    onChange={(e) => {
                      const strippedFormat = stripFormat(e.target.value);
                      const reformatted = formatPrice(strippedFormat, {
                        hasUnit: false,
                      });
                      field.onChange(reformatted);
                    }}
                    size="small"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">₫</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="stock"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    inputMode="numeric"
                    label="Stock"
                    size="small"
                    slotProps={{
                      htmlInput: {
                        pattern: '[0-9]*',
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size="grow">
              <Controller
                control={control}
                name="manufacturer_id"
                render={({ field }) => (
                  <ManufacturerSelect {...field} fullWidth />
                )}
              />
            </Grid>
            <Grid size={12}>
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
            <DevTool control={control} />
          </Grid>
          <Divider />
          <Stack spacing={2}>
            <Box>
              <Typography gutterBottom>Thumbnail</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Image
                  alt="Product thumbnail"
                  height={100}
                  src={thumbnail || ''}
                  width={100}
                />
                <Icon
                  fontSize={24}
                  icon="material-symbols:arrow-right-alt-rounded"
                  style={{
                    color: theme.palette.grey[500],
                  }}
                />
                <Button
                  component="label"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 100,
                    border: 1,
                    borderColor: 'primary.main',
                    borderStyle: 'dashed',
                    borderRadius: 1,
                  }}
                  title="Upload Image"
                >
                  {thumbnailVal.length > 0 ? (
                    <Image
                      alt="New product thumbnail"
                      height={100}
                      src={URL.createObjectURL(thumbnailVal[0])}
                      style={{ objectFit: 'contain' }}
                      width={100}
                    />
                  ) : (
                    <Icon
                      fontSize={48}
                      icon="material-symbols:image-arrow-up-outline-rounded"
                      style={{
                        color: theme.palette.grey[500],
                      }}
                    />
                  )}
                  <VisuallyHiddenInput
                    {...register('thumbnail')}
                    accept="image/*"
                    type="file"
                  />
                </Button>
                <Button
                  disabled={thumbnailVal.length === 0}
                  onClick={() => resetField('thumbnail')}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={() => {
            reset();
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button disabled={!formState.isDirty} type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

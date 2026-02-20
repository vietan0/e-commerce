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
import 'md-editor-rt/lib/style.css';
import { MdEditor } from 'md-editor-rt';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import CategoriesSelect from '@/app/admin/products/_components/CategoriesSelect';
import ManufacturerSelect from '@/app/admin/products/_components/ManufacturerSelect';
import ProductImage from '@/app/admin/products/_components/ProductImage';
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
  description: string;
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
    description,
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
    description: description || '',
  };

  const { control, handleSubmit, formState, setValue, reset } =
useForm<IFormInputs>({
    defaultValues,
  });

// this local state is only here to sync MD Editor with MD Preview,
  // not doing anything with React Hook Form
  const [text, setText] = useState(defaultValues.description);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
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
            <Grid size={12}>
              <Typography gutterBottom variant="body2">
                Description
              </Typography>
              <MdEditor
                language="en-US"
                onChange={(val) => {
                  setValue('description', val, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setText(val);
                }}
                placeholder="Write the description for this product..."
                style={{
                  fontFamily: 'geistSans',
                }}
                value={text}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" sx={{ justifyContent: 'end' }}>
                <Button
                  disabled={!formState.isDirty}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Stack>
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
                  {Math.random() < 0 ? (
                    <Image
                      alt="New product thumbnail"
                      height={100}
                      // src={URL.createObjectURL(thumbnailVal[0])}
                      src={
                        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/q/u/quat-dung-sharp-pj-s40rv-dg-kem-remote-1_2.png'
                      }
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
                  <VisuallyHiddenInput accept="image/*" type="file" />
                </Button>
                <Button>Reset</Button>
              </Stack>
            </Box>
            <Box>
              <Typography gutterBottom>Product Images</Typography>
              <Grid container spacing={1}>
                {product.product_image.map((img) => (
                  <Grid key={img.id} size={3}>
                    <ProductImage image={img} />
                  </Grid>
                ))}
              </Grid>
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
      </DialogActions>
    </Dialog>
  );
}

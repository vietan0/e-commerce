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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { pick } from 'es-toolkit/object';
import 'md-editor-rt/lib/style.css';
import { Link } from '@mui/material';
import { MdEditor } from 'md-editor-rt';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import AppSelect from '@/app/(main)/admin/products/_components/AppSelect';
import CategoriesSelect from '@/app/(main)/admin/products/_components/CategoriesSelect';
import theme from '@/app/theme';
import { placeholderImg } from '@/src/constants/ui';
import useUpdateProduct from '@/src/queries/products/useUpdateProduct';
import type { ProductFull } from '@/src/types';

interface UpdateProductFields {
  name: string;
  brand_id: string;
  categories: string[];
  description: string | null;
}
export default function ProductEditForm({
  product,
  open,
  handleClose,
}: {
  product: ProductFull;
  open: boolean;
  handleClose: () => void;
}) {
  const { id, name, brand_id, product_category, description } = product;

  // defaultValues is updated when product updates (e.g. after successful edit),
  // which will reset form
  const defaultValues = useMemo(
    () => ({
      name,
      description,
      brand_id: String(brand_id),
      categories: product_category.map((pc) => String(pc.category_id)),
    }),
    [name, brand_id, product_category, description],
  );

  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<UpdateProductFields>({
      defaultValues,
    });

  // this local state is only here to sync MD Editor with MD Preview,
  // not doing anything with React Hook Form
  const [text, setText] = useState(defaultValues.description);

  const updateProduct = useUpdateProduct();
  const onSubmit: SubmitHandler<UpdateProductFields> = (formData) => {
    // get dirty fields only
    const dirtyKeys: (keyof UpdateProductFields)[] = [];
    for (const key in formState.dirtyFields) {
      const dirty = formState.dirtyFields[key as keyof UpdateProductFields];
      if (dirty) dirtyKeys.push(key as keyof UpdateProductFields);
    }
    const dirtyFields = pick(formData, dirtyKeys);

    // make sure types match before sending
    const data = {
      ...dirtyFields,
      brand_id: dirtyKeys.includes('brand_id')
        ? Number(dirtyFields.brand_id)
        : undefined,
    };

    updateProduct.mutate({ data, id });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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
      <DialogTitle>
        Edit Product:{' '}
        <Link
          color="inherit"
          component={NextLink}
          href={`/product/${id}`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
          }}
          target="_blank"
          underline="hover"
        >
          {name}
          <Icon fontSize={18} icon="material-symbols:open-in-new-rounded" />
        </Link>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'initial' }}>
        <Stack spacing={2}>
          <Grid
            component="form"
            container
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
          >
            <Grid size="grow">
              <TextField disabled label="ID" size="small" value={id} />
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

            <Grid size="grow">
              <Controller
                control={control}
                name="brand_id"
                render={({ field }) => (
                  <AppSelect
                    {...field}
                    endpoint="brands"
                    fullWidth
                    label="Brand"
                    labelId="brand"
                  />
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
                  setValue('description', val === '' ? null : val, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setText(val);
                }}
                placeholder="Write the description for this product..."
                style={{
                  fontFamily: 'geistSans',
                  height: 500,
                }}
                value={text || ''}
              />
              {/* this is only for RHF Devtools, unused otherwise */}
              <VisuallyHiddenInput {...register('description')} />
            </Grid>
            <Grid size={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'end', alignItems: 'center' }}
              >
                {updateProduct.error && (
                  <Typography color="error" variant="body2">
                    {updateProduct.error.message}
                  </Typography>
                )}
                <Button
                  disabled={!formState.isDirty}
                  loading={updateProduct.isPending}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Stack>
            </Grid>
            <DevT control={control} />
          </Grid>
          <Divider />
          <Stack spacing={2}>
            <Box>
              <Typography gutterBottom>Thumbnail</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Image
                  alt="Product thumbnail"
                  height={100}
                  src={placeholderImg}
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
                {/* product images */}
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

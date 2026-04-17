import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import type { app_userGetPayload } from '@/src/generated/prisma/models';
import useUpdateUser from '@/src/queries/users/useUpdateUser';

type UserFields = {
  name: string;
  phone: string;
  address: string;
};

export default function UserEditFormOrder({
  app_user,
  setEditFormOpen,
}: {
  app_user: app_userGetPayload<{
    omit: { password: true };
    include: { profilePic: true };
  }>;
  setEditFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations();
  // defaultValues is updated when product updates (e.g. after successful edit),
  // which will reset form
  const defaultValues = useMemo(
    () => ({
      name: app_user.name || '',
      phone: app_user.phone || '',
      address: app_user.address || '',
    }),
    [app_user],
  );

  const { control, handleSubmit, formState, watch, reset } =
    useForm<UserFields>({
      defaultValues: {
        name: app_user.name || '',
        phone: app_user.phone || '',
        address: app_user.address || '',
      },
    });

  const nameField = watch('name');
  const phoneField = watch('phone');

  const updateUser = useUpdateUser();
  const onSubmit: SubmitHandler<UserFields> = (formData) => {
    updateUser.mutate(formData);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Card variant="outlined">
      <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  error={!nameField.trim()}
                  {...field}
                  autoFocus
                  fullWidth
                  label={t('profile.Name')}
                  placeholder={t('profile.Enter your name')}
                  required
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!phoneField.trim()}
                  fullWidth
                  label={t('profile.Phone')}
                  placeholder={t('profile.Enter your phone number')}
                  required
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('profile.Address')}
                  placeholder={t('profile.Enter your address')}
                />
              )}
            />
          </Grid>
          <DevT control={control} />
        </Grid>
      </CardContent>
      <CardActions
        sx={{ p: 2, pt: 0, flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <Button color="inherit" onClick={() => setEditFormOpen(false)}>
              {t('common.Cancel')}
            </Button>
            <Button
              disabled={!formState.isDirty || !formState.isValid}
              loading={updateUser.isPending}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              {t('common.Save')}
            </Button>
          </Stack>
          {updateUser.error && (
            <Typography color="error" variant="body2">
              {updateUser.error.message}
            </Typography>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}

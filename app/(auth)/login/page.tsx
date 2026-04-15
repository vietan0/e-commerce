'use client';
import { Icon } from '@iconify/react';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import HomeLink from '@/app/_components/nav/HomeLink';
import { proxyPaths } from '@/src/lib/proxy/proxyPaths';
import useLogin from '@/src/queries/auth/useLogin';

type LoginFields = {
  email: string;
  password: string;
};

export default function Login() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const returnToMatch = proxyPaths.protectedPages.find(({ path }) =>
    returnTo?.startsWith(path),
  );

  const { control, handleSubmit, watch } = useForm<LoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailField = watch('email');
  const passwordField = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();
  const onSubmit: SubmitHandler<LoginFields> = (formData) => {
    login.mutate(formData);
  };

  const t = useTranslations('common');

  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
      variant="outlined"
    >
      <CardContent
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {returnToMatch && (
          <Alert severity="info">{returnToMatch.message}</Alert>
        )}
        <Stack
          direction="row"
          sx={{
            mb: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">{t('Login')}</Typography>
          <HomeLink variant="body1" />
        </Stack>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              fullWidth
              label="Email"
              placeholder="Email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={t('Password')}
              placeholder={t('Password')}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={t(
                          showPassword ? 'Hide password' : 'Show password',
                        )}
                        onClick={() => setShowPassword((b) => !b)}
                        title={t(
                          showPassword ? 'Hide password' : 'Show password',
                        )}
                      >
                        <Icon
                          fontSize={20}
                          icon={
                            showPassword
                              ? 'material-symbols:visibility-off-rounded'
                              : 'material-symbols:visibility-rounded'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              type={showPassword ? 'text' : 'password'}
            />
          )}
        />
        {login.error && (
          <Typography color="error" variant="body2">
            {/** biome-ignore lint/suspicious/noExplicitAny: <Haven't define custom error type.> */}
            {(login.error as any).data.error}
          </Typography>
        )}
        <DevT control={control} />
      </CardContent>
      <CardActions
        sx={{ p: 2, flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Stack spacing={2}>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              disabled={!emailField && !passwordField}
              loading={login.isPending}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              {t('Login')}
            </Button>
            <Button>{t('Forgot password?')}</Button>
          </Stack>
          <Button component={NextLink} href="/register">
            {t("Don't have an account?")} {t('Register')}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

'use client';
import { DevTool } from '@hookform/devtools';
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
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import HomeLink from '@/app/_components/nav/HomeLink';
import { proxyPaths } from '@/src/lib/proxyPaths';
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
          <Typography variant="h5">Login</Typography>
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
              placeholder="Enter your email"
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
              label="Password"
              placeholder="Enter your password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={`${showPassword ? 'Hide' : 'Show'} password`}
                        onClick={() => setShowPassword((b) => !b)}
                        title={`${showPassword ? 'Hide' : 'Show'} password`}
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
        <DevTool control={control} />
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
              Login
            </Button>
            <Button>Forgot password?</Button>
          </Stack>
          <Button component={NextLink} href="/register">
            Don't have an account? Register
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

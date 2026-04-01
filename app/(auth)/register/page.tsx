'use client';
import { Icon } from '@iconify/react';
import {
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
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import DevT from '@/app/_components/DevT';
import HomeLink from '@/app/_components/nav/HomeLink';
import useRegister from '@/src/queries/auth/useRegister';

type RegisterFields = {
  email: string;
  password: string;
};

export default function Register() {
  const { control, handleSubmit, watch } = useForm<RegisterFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailField = watch('email');
  const passwordField = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const register = useRegister();
  const onSubmit: SubmitHandler<RegisterFields> = (formData) => {
    register.mutate(formData);
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
        <Stack
          direction="row"
          sx={{
            mb: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Register</Typography>
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
              loading={register.isPending}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Register
            </Button>
            <Button>Forgot password?</Button>
          </Stack>
          <Button component={NextLink} href="/login">
            Already have an account? Login
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

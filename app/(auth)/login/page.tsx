'use client';
import { DevTool } from '@hookform/devtools';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import HomeLink from '@/app/_components/nav/HomeLink';

type LoginFields = {
  email: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFields> = (formData) => {
    console.log('formData', formData);
  };

  return (
    <Container
      sx={{
        maxWidth: {
          xs: 500,
        },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
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
          <DevTool control={control} />
        </CardContent>
        <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Login
          </Button>
          <Button>Forgot password?</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

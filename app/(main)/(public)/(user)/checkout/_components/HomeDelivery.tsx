import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import QueryError from '@/app/_components/QueryError';
import type { OrderFields } from '@/app/(main)/(public)/(user)/checkout/page';
import useReturnTo from '@/src/hooks/useReturnTo';
import useMe from '@/src/queries/auth/useMe';

export default function HomeDelivery() {
  const { setValue } = useFormContext<OrderFields>();
  // when this comp render, get cust's address, fill in form immediately
  const { data, isPending, error } = useMe();
  const router = useRouter();
  const returnTo = useReturnTo();

  useEffect(() => {
    setValue('shipping_address', data!.app_user.address || '');
  }, [data?.app_user.address, setValue]);

  useEffect(() => {
    if (data === null) router.push(`/login?returnTo=${returnTo}`);
  }, [data, returnTo, router]);

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Stack direction="row" spacing={2}>
      <Typography>{data!.app_user.name}</Typography>
      <Typography>{data!.app_user.phone || 'No phone number'}</Typography>
      <Typography>{data!.app_user.email || 'No email'}</Typography>
      <Typography>{data!.app_user.address || 'No address'}</Typography>
    </Stack>
  );
}

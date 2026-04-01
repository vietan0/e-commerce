import { Box } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import StoresSelect from '@/app/(main)/(public)/(user)/checkout/_components/StoresSelect';
import type { OrderFields } from '@/app/(main)/(public)/(user)/checkout/page';

export default function StorePickup() {
  const { control } = useFormContext<OrderFields>();
  return (
    <Box>
      <Controller
        control={control}
        name="store_id"
        render={({ field }) => <StoresSelect {...field} fullWidth />}
      />
    </Box>
  );
}

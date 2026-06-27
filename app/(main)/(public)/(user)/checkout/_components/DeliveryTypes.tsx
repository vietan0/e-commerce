import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import QueryError from '@/app/_components/QueryError';
import HomeDelivery from '@/app/(main)/(public)/(user)/checkout/_components/HomeDelivery';
import StorePickup from '@/app/(main)/(public)/(user)/checkout/_components/StorePickup';
import type { OrderFields } from '@/app/(main)/(public)/(user)/checkout/page';
import useResource from '@/src/queries/useResource';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={Number(value) !== index} role="tabpanel" {...other}>
      {Number(value) === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DeliveryTypes() {
  const {
    data: deliveryTypes,
    isPending,
    error,
  } = useResource('delivery-types');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<
    string | null
  >(null);
  const { setValue } = useFormContext<OrderFields>();

  useEffect(() => {
    // init state when query completes
    if (deliveryTypes && selectedDeliveryType === null) {
      setSelectedDeliveryType(String(deliveryTypes[0].id));
      setValue('delivery_type_id', String(deliveryTypes[0].id));
    }
  }, [deliveryTypes, selectedDeliveryType, setValue]);

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setSelectedDeliveryType(newValue);
    setValue('delivery_type_id', newValue);
  };

  if (isPending || selectedDeliveryType === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          aria-label="Payment methods"
          onChange={handleChange}
          value={selectedDeliveryType}
        >
          {deliveryTypes.map(({ id, name }) => (
            <Tab key={id} label={name} value={id} />
          ))}
        </Tabs>
      </Box>
      {deliveryTypes.map(({ id, code }) => (
        <CustomTabPanel
          index={Number(id)}
          key={id}
          value={selectedDeliveryType}
        >
          {code === 'HOME_DELIVERY' ? <HomeDelivery /> : <StorePickup />}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import { type SyntheticEvent, useEffect, useState } from 'react';
import QueryError from '@/app/_components/QueryError';
import useDeliveryTypes from '@/src/queries/delivery-types/useDeliveryTypes';

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
  const { data: deliveryTypes, isPending, error } = useDeliveryTypes();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<
    string | null
  >(null);

  useEffect(() => {
    // init state when query completes
    if (deliveryTypes && selectedDeliveryType === null)
      setSelectedDeliveryType(String(deliveryTypes[0].id));
  }, [deliveryTypes, selectedDeliveryType]);

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setSelectedDeliveryType(newValue);
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
          {deliveryTypes.map((delivery_type) => (
            <Tab
              key={delivery_type.id}
              label={delivery_type.name}
              value={delivery_type.id}
            />
          ))}
        </Tabs>
      </Box>
      {deliveryTypes.map((delivery_type) => (
        <CustomTabPanel
          index={Number(delivery_type.id)}
          key={delivery_type.id}
          value={selectedDeliveryType}
        >
          Tab content for {delivery_type.name}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

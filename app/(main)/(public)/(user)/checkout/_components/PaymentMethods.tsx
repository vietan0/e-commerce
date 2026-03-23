import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { type SyntheticEvent, useEffect, useState } from 'react';
import QueryError from '@/app/_components/QueryError';
import usePaymentMethods from '@/src/queries/payment-methods/usePaymentMethods';

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

export default function PaymentMethods() {
  const { data: paymentMethods, isPending, error } = usePaymentMethods();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  useEffect(() => {
    // init state when query completes
    if (paymentMethods && selectedPaymentMethod === null)
      setSelectedPaymentMethod(String(paymentMethods[0].id));
  }, [paymentMethods, selectedPaymentMethod]);

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setSelectedPaymentMethod(newValue);
  };

  if (isPending || selectedPaymentMethod === null) {
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
          value={selectedPaymentMethod}
        >
          {paymentMethods.map((payment_method) => (
            <Tab
              disabled={payment_method.code !== 'COD'}
              key={payment_method.id}
              label={payment_method.name}
              // sx={{
              //   textTransform: 'none',
              // }}
              value={payment_method.id}
            />
          ))}
        </Tabs>
      </Box>
      {paymentMethods.map((payment_method) => (
        <CustomTabPanel
          index={Number(payment_method.id)}
          key={payment_method.id}
          value={selectedPaymentMethod}
        >
          Tab content for {payment_method.name}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

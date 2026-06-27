import { Tab, Tabs } from '@mui/material';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import useResource from '@/src/queries/useResource';

export default function OrderStatusTabs() {
  const {
    data: orderStatuses,
    isPending,
    error,
  } = useResource('order-statuses');
  const searchParams = useSearchParams();
  const status_code = searchParams.get('status_code');

  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;
  return (
    <Tabs
      aria-label="Filter orders by status"
      sx={{
        backgroundColor: 'grey.100',
        borderRadius: 2,
        mb: 2,
      }}
      value={status_code}
    >
      {[{ id: null, code: null, name: 'All' }, ...orderStatuses].map(
        ({ id, code, name }) => (
          <Tab
            component={NextLink}
            href={code ? `/me/orders?status_code=${code}` : '/me/orders'}
            key={id}
            label={name}
            value={code}
          />
        ),
      )}
    </Tabs>
  );
}

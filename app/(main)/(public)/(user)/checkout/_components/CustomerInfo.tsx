import { Icon } from '@iconify/react';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import UserEditFormOrder from '@/app/(main)/(public)/(user)/checkout/_components/UserEditFormOrder';
import useReturnTo from '@/src/hooks/useReturnTo';
import useMe from '@/src/queries/auth/useMe';

export default function CustomerInfo() {
  const { data, isPending, error } = useMe();
  const router = useRouter();
  const returnTo = useReturnTo();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const t = useTranslations('profile');

  useEffect(() => {
    if (data === null) router.push(`/login?returnTo=${returnTo}`);
  }, [data, returnTo, router]);

  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;

  return (
    <>
      <Stack
        direction="row"
        id="CustomerInfo"
        spacing={2}
        sx={{ alignItems: 'center', mb: 2 }}
      >
        {data?.app_user.name ? (
          <Typography>{data.app_user.name}</Typography>
        ) : (
          <Typography color="error">{t('Missing name')}</Typography>
        )}
        {data?.app_user.phone ? (
          <Typography>{data.app_user.phone}</Typography>
        ) : (
          <Typography color="error">{t('Missing phone number')}</Typography>
        )}
        {data?.app_user.email ? (
          <Typography>{data.app_user.email}</Typography>
        ) : (
          <Typography color="error">{t('Missing email')}</Typography>
        )}
        {data?.app_user.address ? (
          <Typography>{data.app_user.address}</Typography>
        ) : (
          <Typography color="error">{t('Missing address')}</Typography>
        )}
        <Button
          onClick={() => setEditFormOpen((b) => !b)}
          size="small"
          startIcon={
            <Icon
              icon="material-symbols:edit-outline-rounded"
              style={{ fontSize: 16 }}
            />
          }
        >
          {editFormOpen ? t('Stop editing') : t('Edit profile')}
        </Button>
      </Stack>
      {editFormOpen && (
        <UserEditFormOrder
          app_user={data!.app_user}
          setEditFormOpen={setEditFormOpen}
        />
      )}
    </>
  );
}

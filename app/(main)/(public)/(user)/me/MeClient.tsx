'use client';

import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useState } from 'react';
import QueryError from '@/app/_components/QueryError';
import VisuallyHiddenInput from '@/app/_components/VisuallyHiddenInput';
import UserEditForm from '@/app/(main)/(public)/(user)/me/UserEditForm';
import { profilePlaceholder } from '@/src/constants/ui';
import useMe from '@/src/queries/auth/useMe';
import useUpdateProfilePic from '@/src/queries/users/useUpdateProfilePic';

export default function MeClient() {
  const { data, isPending, error } = useMe();
  const updateProfilePic = useUpdateProfilePic();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const t = useTranslations('profile');

  async function onImageSelected(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    formData.append('file', e.target.files![0]);
    updateProfilePic.mutate(formData);
  }

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  const { app_user } = data!;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          outline: app_user.profilePic ? 0 : 1,
          outlineColor: 'grey.300',
          borderRadius: 2,
          width: 'max-content',
          lineHeight: 0,
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <Image
          alt={`${app_user.name}'s profile picture`}
          height={120}
          src={app_user.profilePic?.url || profilePlaceholder}
          style={{ objectFit: 'cover' }}
          width={120}
        />
        {updateProfilePic.isPending && (
          <Box
            sx={{
              width: 120,
              height: 120,
              position: 'absolute',
              top: 0,
              backgroundColor: 'hsl(0 100% 100% / 0.75)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Tooltip title={t('Change profile pic')}>
          <IconButton
            aria-label={t('Change profile pic')}
            component="label"
            disabled={updateProfilePic.isPending}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              border: 1,
              borderColor: 'grey.500',
              backgroundColor: 'hsl(0 100% 100% / 0.7)',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <Icon fontSize={14} icon="material-symbols:edit-outline-rounded" />
            <VisuallyHiddenInput
              accept="image/*"
              onChange={onImageSelected}
              type="file"
            />
          </IconButton>
        </Tooltip>
      </Box>
      {updateProfilePic.error && (
        <Typography color="error" variant="body2">
          {updateProfilePic.error.message}
        </Typography>
      )}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="h6">{app_user.name}</Typography>
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
      <Typography>Email: {app_user.email}</Typography>
      <Typography>
        {t('Phone')}: {app_user.phone}
      </Typography>
      <Typography>
        {t('Address')}: {app_user.address}
      </Typography>
      {editFormOpen && (
        <UserEditForm app_user={app_user} setEditFormOpen={setEditFormOpen} />
      )}
    </>
  );
}

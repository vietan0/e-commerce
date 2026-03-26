'use client';

import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import QueryError from '@/app/_components/QueryError';
import UserEditForm from '@/app/(main)/(public)/(user)/me/UserEditForm';
import { profilePlaceholder } from '@/src/constants/ui';
import useMe from '@/src/queries/auth/useMe';

export default function MeClient() {
  const { data, isPending, error } = useMe();
  const [editFormOpen, setEditFormOpen] = useState(false);

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
      <Image
        alt={`${app_user.name}'s profile picture`}
        height={100}
        src={app_user.profilePic?.url || profilePlaceholder}
        width={100}
      />
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
          {editFormOpen ? 'Stop editing' : 'Edit profile'}
        </Button>
      </Stack>
      <Typography>Email: {app_user.email}</Typography>
      <Typography>Phone: {app_user.phone}</Typography>
      <Typography>Address: {app_user.address}</Typography>
      {editFormOpen && (
        <UserEditForm app_user={app_user} setEditFormOpen={setEditFormOpen} />
      )}
    </>
  );
}

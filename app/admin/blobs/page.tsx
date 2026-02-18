'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import Blob from '@/app/admin/blobs/Blob';
import useBlobs from '@/src/queries/useBlobs';

export default function Blobs() {
  const { data, isPending, error } = useBlobs({ sort: '-uploadedAt' });
  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error.light">
        Error fetching blobs:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );

  return (
    <>
      <Typography gutterBottom variant="h5">
        Blobs
      </Typography>
      <Grid container spacing={0.5}>
        {data.blobs.map((blob) => (
          <Grid key={blob.url} size={3}>
            <Blob blob={blob} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

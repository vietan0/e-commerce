'use client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import Blob from '@/app/(main)/admin/blobs/Blob';
import useBlobs from '@/src/queries/blobs/useBlobs';

export default function Blobs() {
  const { data, isPending, error } = useBlobs({ sort: '-uploadedAt' });
  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;

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

'use client';
import { Grid, Typography } from '@mui/material';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import Blob from '@/app/(main)/admin/blobs/Blob';
import useBlobs from '@/src/queries/blobs/useBlobs';

export default function Blobs() {
  const { data: blobs, isPending, error } = useBlobs({ sort: '-uploadedAt' });
  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;

  return (
    <>
      <Typography gutterBottom variant="h5">
        Blobs
      </Typography>
      <Grid container spacing={0.5}>
        {blobs.map((blob) => (
          <Grid key={blob.url} size={3}>
            <Blob blob={blob} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

import { Box, Typography } from '@mui/material';

export default function QueryError({ error }: { error: Error }) {
  console.log('QueryError', error);
  return (
    <Box>
      <Typography>Error from query:</Typography>
      <Typography
        color="error.light"
        sx={{ fontFamily: 'monospace', fontSize: 14 }}
      >
        {error.message}
      </Typography>
    </Box>
  );
}

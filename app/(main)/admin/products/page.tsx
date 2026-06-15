import { Stack, Typography } from '@mui/material';
export default function Products() {
  return (
    <Stack sx={{ height: 1, justifyContent: 'center' }}>
      <Typography
        color="textSecondary"
        sx={{ fontSize: 20, textAlign: 'center' }}
      >
        Select a product to view info
      </Typography>
    </Stack>
  );
}

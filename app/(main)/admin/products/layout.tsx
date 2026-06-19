import { Divider, Grid, Stack, Typography } from '@mui/material';
import CreateProductButton from '@/app/(main)/admin/products/_components/CreateProductButton';
import ProductSidebar from '@/app/(main)/admin/products/_components/ProductSidebar';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack sx={{ height: 1 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: 2,
          py: 1,
          justifyContent: 'space-between',
        }}
      >
        <Typography gutterBottom variant="h6">
          Products
        </Typography>
        <CreateProductButton />
      </Stack>
      <Divider />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <ProductSidebar />
        </Grid>
        <Divider orientation="vertical" />
        <Grid size={{ xs: 12, md: 'grow' }}>{children}</Grid>
      </Grid>
    </Stack>
  );
}

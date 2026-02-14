import { Box, Skeleton, Stack } from '@mui/material';
import AllProducts from '@/src/components/AllProducts';
import Categories from '@/src/components/Categories';
import HotSale from '@/src/components/HotSale';

export default function Home() {
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          minHeight: 200,
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Categories />
        </Box>
        <Skeleton
          sx={{
            flex: 1,
            height: 'auto',
          }}
          variant="rounded"
        />
        <Skeleton
          sx={{
            height: 'auto',
          }}
          variant="rounded"
          width={210}
        />
      </Stack>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: 1,
        }}
      >
        <HotSale />
        <AllProducts />
      </Box>
    </Stack>
  );
}

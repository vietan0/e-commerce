import { Box, Skeleton, Stack } from '@mui/material';
import Categories from '@/app/_components/Categories';
import AllProducts from '@/app/(main)/(public)/_components/AllProducts';
import HotSale from '@/app/(main)/(public)/_components/HotSale';

export default function Home() {
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
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

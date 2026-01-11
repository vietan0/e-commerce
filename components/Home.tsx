'use client';
import {
  Box,
  Container,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Categories from '@/components/Categories';
import HotSale from '@/components/HotSale';

export default function Home() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container
      sx={{
        py: 1,
        [theme.breakpoints.up('md')]: {
          py: 4,
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            minHeight: 200,
          }}
        >
          {isMd && <Categories />}
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
        </Box>
      </Stack>
    </Container>
  );
}

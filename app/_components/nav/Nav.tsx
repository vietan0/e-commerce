import { AppBar, Box } from '@mui/material';
import ElevationScroll from '@/app/_components/nav/ElevationScroll';
import HomeLink from '@/app/_components/nav/HomeLink';
import NavCategories from '@/app/_components/nav/NavCategories';
import RightBtns from '@/app/_components/nav/NavRight';

export default function Nav() {
  return (
    <ElevationScroll>
      <AppBar
        color="primary"
        position="sticky"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <HomeLink />
          <NavCategories />
        </Box>
        <RightBtns />
      </AppBar>
    </ElevationScroll>
  );
}

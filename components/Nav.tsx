import { AppBar, Box, Button } from '@mui/material';
import HomeLink from '@/components/HomeLink';
import NavCategories from '@/components/NavCategories';

export default function Nav() {
  return (
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
      <Button color="inherit" variant="outlined">
        Login
      </Button>
    </AppBar>
  );
}

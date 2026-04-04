'use client';
import { Icon } from '@iconify/react';
import {
  Box,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import theme from '@/app/theme';

export default function MeLayout({ children }: { children: React.ReactNode }) {
  const currentPath = '/me';
  const pathname = usePathname();
  const segmentAfterMe = pathname.split(currentPath)[1];
  const links = [
    {
      name: 'Thông tin tài khoản',
      path: '',
      icon: 'material-symbols:person-outline-rounded',
    },
    {
      name: 'Lịch sử đơn hàng',
      path: '/orders',
      icon: 'material-symbols:shopping-bag-outline',
    },
  ];

  const matchedLink = links.find((link) => {
    if (link.path) return segmentAfterMe.startsWith(link.path);
    else return segmentAfterMe === link.path; // both empty string
  });
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 2.5 }}>
          <MenuList>
            {links.map(({ name, path, icon }) => (
              <MenuItem
                component={NextLink}
                href={currentPath + path}
                key={path}
                selected={path === matchedLink!.path}
              >
                <ListItemIcon>
                  <Icon
                    fontSize={20}
                    icon={icon}
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  slotProps={{ primary: { fontSize: 14 } }}
                />
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
        <Grid size={{ xs: 12, md: 'grow' }}>
          <Typography sx={{ mb: 4 }} variant="h5">
            {matchedLink!.name}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

'use client';
import { Icon } from '@iconify/react';
import {
  Container,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import theme from '@/app/theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const firstSegment = pathname.match(/^\/\w+/)![0];
  const links = [
    {
      name: 'Products',
      path: `${firstSegment}/products`,
      icon: 'material-symbols:inventory-2-outline-rounded',
    },
    {
      name: 'Orders',
      path: `${firstSegment}/orders`,
      icon: 'material-symbols:shopping-bag-outline',
    },
    {
      name: 'Blobs',
      path: `${firstSegment}/blobs`,
      icon: 'material-symbols:perm-media-outline-rounded',
    },
  ];
  return (
    <Container
      sx={{
        flexBasis: 0,
        minHeight: 0,
        flexGrow: 1,
        px: {
          sm: 0,
        },
        maxWidth: {
          lg: 1500,
        },
      }}
    >
      <Grid container sx={{ height: 1 }}>
        <Grid size={{ xs: 12, md: 2 }}>
          <MenuList>
            {links.map(({ name, path, icon }) => (
              <MenuItem
                component={NextLink}
                href={path}
                key={path}
                selected={path === pathname}
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
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
        <Divider orientation="vertical" />
        <Grid
          size={{ xs: 12, md: 'grow' }}
          sx={{ height: 1, overflow: 'auto' }}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

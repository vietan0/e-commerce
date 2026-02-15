'use client';
import { Icon } from '@iconify/react';
import {
  Container,
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
  const links = [
    {
      name: 'Products',
      path: '/admin/products',
      icon: 'material-symbols:inventory-2-outline-rounded',
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: 'material-symbols:shopping-bag-outline',
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

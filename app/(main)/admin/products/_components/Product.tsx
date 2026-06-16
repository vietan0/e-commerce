import { Icon } from '@iconify/react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import type { ProductFull } from '@/src/types';

export default function Product({ product }: { product: ProductFull }) {
  const pathname = usePathname();
  const basePath = pathname.split('/').slice(0, 3).join('/');
  const { id } = useParams();

  return (
    <ListItem disablePadding>
      <ListItemButton
        alignItems="flex-start"
        component={NextLink}
        href={`${basePath}/${product.id}`}
        selected={product.id === Number(id)}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Icon
            fontSize={20}
            icon="material-symbols:phone-android-outline-rounded"
          />
        </ListItemIcon>
        <ListItemText
          primary={product.name}
          secondary={
            <Typography color="textSecondary" component="span" variant="body2">
              <span>{product.brand?.name}</span>
              <span> · </span>
              <span>{product.id}</span>
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

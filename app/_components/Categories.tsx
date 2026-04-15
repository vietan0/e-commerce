'use client';
import { Icon } from '@iconify/react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import theme from '@/app/theme';

export default function Categories({ closeMenu }: { closeMenu?: () => void }) {
  const t = useTranslations('categories');
  const menus = [
    {
      icon: 'material-symbols:phone-android-outline-rounded',
      name: t('Mobiles, Tablets'),
    },
    {
      icon: 'material-symbols:laptop-windows-outline-rounded',
      name: t('Laptops'),
    },
    {
      icon: 'material-symbols:headphones-outline-rounded',
      name: t('Audio, Headphones'),
    },
    {
      icon: 'material-symbols:watch-outline-rounded',
      name: t('Smartwatches, Cameras'),
    },
    {
      icon: 'material-symbols:add-home-outline-rounded',
      name: t('Smart Home, Beauty Products'),
    },
    { icon: 'material-symbols:cable-rounded', name: t('Accessories') },
    {
      icon: 'material-symbols:desktop-mac-outline-rounded',
      name: t('PC, Monitors, Printers'),
    },
    {
      icon: 'material-symbols:connected-tv-outline-rounded',
      name: t('TV & Electronics'),
    },
    { icon: 'material-symbols:repeat-rounded', name: t('Trade-in') },
    {
      icon: 'material-symbols:home-storage-outline-rounded',
      name: t('Used'),
    },
    {
      icon: 'material-symbols:percent-discount-outline-rounded',
      name: t('Deals'),
    },
    {
      icon: 'material-symbols:newsmode-outline-rounded',
      name: t('Tech News'),
    },
  ];

  return (
    <MenuList
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        maxWidth: 280,
        borderRadius: 1,
        border: closeMenu ? 0 : 1,
        borderColor: closeMenu ? undefined : 'grey.300',
      }}
    >
      {menus.map((m) => (
        <MenuItem key={m.name} onClick={closeMenu}>
          <ListItemIcon>
            <Icon
              fontSize={20}
              icon={m.icon}
              style={{
                color: theme.palette.primary.main,
              }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography noWrap variant="body2">
              {m.name}
            </Typography>
          </ListItemText>
          <ListItemIcon
            sx={{
              justifyContent: 'end',
            }}
          >
            <Icon fontSize={20} icon="ic:round-keyboard-arrow-right" />
          </ListItemIcon>
        </MenuItem>
      ))}
    </MenuList>
  );
}

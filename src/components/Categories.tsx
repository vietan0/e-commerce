'use client';
import { Icon } from '@iconify/react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  useTheme,
} from '@mui/material';

export default function Categories({ closeMenu }: { closeMenu?: () => void }) {
  const theme = useTheme();

  const menus = [
    {
      icon: 'material-symbols:phone-android-outline-rounded',
      name: 'Điện thoại, Tablet',
    },
    {
      icon: 'material-symbols:laptop-windows-outline-rounded',
      name: 'Laptop',
    },
    {
      icon: 'material-symbols:headphones-outline-rounded',
      name: 'Âm thanh, Mic thu âm',
    },
    {
      icon: 'material-symbols:watch-outline-rounded',
      name: 'Đồng hồ, Camera',
    },
    {
      icon: 'material-symbols:add-home-outline-rounded',
      name: 'Đồ gia dụng, Làm đẹp',
    },
    { icon: 'material-symbols:cable-rounded', name: 'Phụ kiện' },
    {
      icon: 'material-symbols:desktop-mac-outline-rounded',
      name: 'PC, Màn hình, Máy in',
    },
    {
      icon: 'material-symbols:connected-tv-outline-rounded',
      name: 'Tivi, Điện máy',
    },
    { icon: 'material-symbols:repeat-rounded', name: 'Thu cũ đổi mới' },
    {
      icon: 'material-symbols:home-storage-outline-rounded',
      name: 'Hàng cũ',
    },
    {
      icon: 'material-symbols:percent-discount-outline-rounded',
      name: 'Khuyến mãi',
    },
    {
      icon: 'material-symbols:newsmode-outline-rounded',
      name: 'Tin công nghệ',
    },
  ];

  return (
    <MenuList
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        maxWidth: 250,
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
          <ListItemText
            slotProps={{
              primary: {
                fontSize: 14,
              },
            }}
          >
            {m.name}
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

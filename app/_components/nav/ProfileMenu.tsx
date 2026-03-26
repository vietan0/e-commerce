import { Icon } from '@iconify/react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { type MouseEvent, useState } from 'react';
import theme from '@/app/theme';
import useLogout from '@/src/queries/auth/useLogout';

export default function ProfileBtn({ name }: { name: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useLogout();
  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        color="inherit"
        id="profile-btn"
        onClick={handleClick}
        startIcon={<Icon icon="material-symbols:person-outline-rounded" />}
        sx={{
          maxWidth: 150,
        }}
        variant="outlined"
      >
        <Typography noWrap variant="inherit">
          {name}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        id="basic-menu"
        onClose={handleClose}
        open={open}
        slotProps={{
          list: {
            'aria-labelledby': 'profile-btn',
          },
        }}
      >
        <MenuItem component={NextLink} href="/me">
          <ListItemIcon>
            <Icon
              fontSize={20}
              icon="material-symbols:person-outline-rounded"
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
            Tài khoản
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Icon
              fontSize={20}
              icon="material-symbols:logout-rounded"
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
            Đăng xuất
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

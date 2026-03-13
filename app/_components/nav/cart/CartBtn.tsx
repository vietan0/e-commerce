import { Icon } from '@iconify/react';
import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  Typography,
} from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import CartMenuContent from '@/app/_components/nav/cart/CartMenuContent';
import useCart from '@/src/queries/cart/useCart';

export default function CartBtn() {
  const { data, isPending, error } = useCart();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'cartMenu',
  });

  if (isPending) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress color="inherit" size={20} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error.light">
        Error fetching cart:
        <Typography sx={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Typography>
    );
  }
  return (
    <>
      <IconButton
        aria-label="Giỏ hàng"
        color="inherit"
        {...bindHover(popupState)}
      >
        <Badge badgeContent={data.cart_items.length} color="error">
          <Icon
            fontSize={20}
            icon="material-symbols:shopping-cart-outline-rounded"
          />
        </Badge>
      </IconButton>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 400 },
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CartMenuContent cart_items={data.cart_items} />
      </HoverMenu>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={false}
        slotProps={{
          paper: {
            sx: { width: 400 },
          },
        }}
      >
        <CartMenuContent cart_items={data.cart_items} />
      </Menu>
    </>
  );
}

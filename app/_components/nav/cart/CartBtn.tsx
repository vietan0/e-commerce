import { Icon } from '@iconify/react';
import { Badge, Box, CircularProgress, IconButton } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import NextLink from 'next/link';
import CartMenuContent from '@/app/_components/nav/cart/CartMenuContent';
import QueryError from '@/app/_components/QueryError';
import theme from '@/app/theme';
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
    if (error.message.includes('401 Unauthorized')) {
      return (
        <IconButton
          aria-label="Giỏ hàng"
          color="inherit"
          {...bindHover(popupState)}
          component={NextLink}
          href="/login"
        >
          <Icon
            fontSize={20}
            icon="material-symbols:shopping-cart-outline-rounded"
          />
        </IconButton>
      );
    }
    return <QueryError error={error} />;
  }

  return (
    <>
      <IconButton
        aria-label="Giỏ hàng"
        color="inherit"
        {...bindHover(popupState)}
        component={NextLink}
        href="/cart"
      >
        <Badge
          badgeContent={data.cart_items.length}
          color="error"
          slotProps={{
            badge: {
              sx: {
                backgroundColor: 'white',
                color: theme.palette.primary.main,
              },
            },
          }}
        >
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
    </>
  );
}

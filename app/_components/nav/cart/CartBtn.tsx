import { Icon } from '@iconify/react';
import { Box, IconButton } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import CartMenuContent from '@/app/_components/nav/cart/CartMenuContent';
export default function CartBtn() {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
  return (
    <>
      <IconButton
        aria-label="Giỏ hàng"
        color="inherit"
        title="Giỏ hàng"
        {...bindHover(popupState)}
      >
        <Icon
          fontSize={20}
          icon="material-symbols:shopping-cart-outline-rounded"
        />
      </IconButton>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            border: 1,
            bgcolor: 'red',
            width: 50,
            height: 50,
          }}
        >
          <CartMenuContent />
        </Box>
      </HoverMenu>
    </>
  );
}

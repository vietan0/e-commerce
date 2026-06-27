'use client';
import { Icon } from '@iconify/react';
import { Badge, IconButton } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import Loading from '@/app/_components/Loading';
import CartMenuContent from '@/app/_components/nav/cart/CartMenuContent';
import QueryError from '@/app/_components/QueryError';
import useCart from '@/src/queries/cart/useCart';

export default function CartBtn() {
  const { data: cart_items, isPending, error } = useCart();
  const t = useTranslations('cart');

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'cartMenu',
  });

  if (isPending) {
    return (
      <Loading
        circularProps={{ color: 'inherit', size: 20 }}
        stackSx={{ height: 'auto' }}
      />
    );
  }

  if (error) {
    if (error.message.includes('401 Unauthorized')) {
      return (
        <IconButton
          aria-label={t('Cart')}
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
        aria-label={t('Cart')}
        color="inherit"
        {...bindHover(popupState)}
        component={NextLink}
        href="/cart"
      >
        <Badge
          badgeContent={cart_items.length}
          color="error"
          slotProps={{
            badge: {
              sx: (theme) => ({
                backgroundColor: 'white',
                color: theme.palette.primary.main,
              }),
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
        <CartMenuContent cart_items={cart_items} />
      </HoverMenu>
    </>
  );
}

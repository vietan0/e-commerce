import { Button, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import EmptyCart from '@/app/_components/EmptyCart';
import CartItem from '@/app/_components/nav/cart/CartItem';
import type { cart_itemGetPayload } from '@/src/generated/prisma/models';

export default function CartMenuContent({
  cart_items,
}: {
  cart_items: cart_itemGetPayload<{
    include: { product: true };
  }>[];
}) {
  const t = useTranslations('cart');

  if (cart_items.length === 0) return <EmptyCart inMenu />;

  return (
    <>
      {cart_items.map((cart_item) => (
        <CartItem cart_item={cart_item} key={cart_item.id} />
      ))}
      <Stack
        direction="row"
        sx={{ justifyContent: 'flex-end', px: 0.75, mt: 0.5 }}
      >
        <Button component={NextLink} href="/cart">
          {t('View cart')}
        </Button>
      </Stack>
    </>
  );
}

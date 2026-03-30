import type { cart_itemGetPayload } from '@/src/generated/prisma/models';

type CartItemWithProduct = cart_itemGetPayload<{
  include: {
    product: {
      include: { thumbnail: true };
    };
  };
}>;

export function calcLineTotal(cart_item: CartItemWithProduct) {
  /* @ts-expect-error */
  return cart_item.product.final_price * cart_item.quantity;
}

function calcSubtotal(cart_items: CartItemWithProduct[]) {
  const subtotal = cart_items.reduce(
    (prev, curr) => prev + calcLineTotal(curr),
    0,
  );

  return subtotal;
}

function calcTotalValue(
  cart_items: CartItemWithProduct[],
  shipping_fee: number,
) {
  return calcSubtotal(cart_items) + shipping_fee;
}

export function calcOrderValues(
  cart_items: CartItemWithProduct[],
  shipping_fee: number,
) {
  const subtotal = calcSubtotal(cart_items);
  const total_value = calcTotalValue(cart_items, shipping_fee);
  return { subtotal, total_value };
}

import type { productGetPayload } from '@/lib/generated/prisma/models';

/**
 * e.g. `12000000.0` -> `12.000.000₫`
 * @param numeric numeric(x,y) from postgres
 */
export default function formatPrice(numeric: string) {
  const wholeStr = numeric.split('.')[0];
  const wholeNum = Number(wholeStr);
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  })
    .format(wholeNum)
    .replace(/\s/, '');

  return formatted;
}

export function calcPriceAfterDiscounts(
  product: productGetPayload<{
    include: {
      manufacturer: true;
      product_image: true;
      discount_product: {
        include: {
          discount: {
            include: {
              discount_type: true;
            };
          };
        };
      };
      product_category: {
        include: {
          category: true;
        };
      };
    };
  }>,
) {
  const base_price = Number(product.base_price);
  let final_price = base_price;

  product.discount_product.forEach((dp) => {
    if (dp.discount === null) return;

    const { discount_type, value } = dp.discount;
    if (discount_type === null) return;
    if (discount_type.name === 'percentage') {
      const discounted_value = (base_price * Number(value)) / 100;
      final_price -= discounted_value;
    } else {
      const discounted_value = Number(value);
      final_price -= discounted_value;
    }
  });

  return final_price.toString();
}

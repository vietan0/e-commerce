import type { productGetPayload } from '@/src/generated/prisma/models';

export function stripFormat(str: string) {
  const stripped = str.replaceAll(/[\s.,]/g, '');
  return stripped;
}

/**
 * - e.g. `12000000` -> `12.000.000₫`
 * - e.g. `12000000.5` -> `12.000.000,5₫`
 * @param numeric numeric(x,y) from postgres
 */
export function formatPrice(
  numeric: string,
  options: {
    hasUnit?: boolean;
  } = {},
) {
  const defaultOptions = {
    hasUnit: true,
  };
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  const num = Number(numeric);
  let formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
    maximumFractionDigits: 3,
    trailingZeroDisplay: 'stripIfInteger',
  })
    .format(num)
    .replaceAll(/\s/g, '');

  if (!finalOptions.hasUnit) {
    formatted = formatted.slice(0, -1);
  }
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

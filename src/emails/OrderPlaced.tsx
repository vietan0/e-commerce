import {
  Body,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { createTranslator } from 'next-intl';
import { formatPrice } from '@/src/lib/price';
import type { OrderFull } from '@/src/types';
import 'dayjs/locale/vi';

dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);

export default async function OrderPlaced({
  order,
  locale,
}: {
  order: OrderFull;
  locale: string;
}) {
  const finalLocale = locale || 'vi-VN';
  dayjs.locale(finalLocale.slice(0, 2));

  const t = createTranslator({
    messages: await import(`../../messages/${finalLocale}.json`),
    namespace: undefined,
    locale: finalLocale,
  });

  const exampleOrder = {
    id: '14',
    code: 'UYRC66J0V9UAJ9W',
    subtotal: '103960000',
    shipping_fee: '15000',
    total_value: '103975000',
    shipping_address: '23 Nguyễn Biểu',
    created_at: '2026-03-31T07:20:36.382Z',
    updated_at: null,
    user_id: '4ec350fa-76f6-4813-879b-b54d0b88e5c4',
    order_status_id: '1',
    payment_status_id: '2',
    payment_method_id: '1',
    store_id: null,
    delivery_type_id: '1',
    note: null,
    delivery_type: {
      id: '1',
      code: 'HOME_DELIVERY',
      name: 'Giao hàng tận nơi',
      shipping_fee: '15000',
    },
    order_status: {
      id: '1',
      code: 'PLACED',
      name: 'Placed',
      is_terminal: false,
      index: 1,
    },
    payment_method: {
      id: '1',
      code: 'COD',
      name: 'Thanh toán khi nhận hàng',
      index: 1,
    },
    payment_status: {
      id: '2',
      code: 'PENDING',
      name: 'Pending',
      is_terminal: false,
      index: null,
    },
    store: null,
    order_product: [
      {
        order_id: '14',
        product_id: '45',
        quantity: 1,
        unit_price: '16990000',
        line_total: '16990000',
        id: '21',
        product: {
          id: '45',
          name: 'iPhone 16e 128GB | Chính hãng VN/A',
          base_price: '16990000',
          description:
            '# NovaTech X12 Pro Laptop\r\n\r\nThe **NovaTech X12 Pro** is a powerhouse designed for creators, developers, and professionals who demand performance without compromise. Slim, fast, and built to last — the X12 Pro redefines what a modern laptop can be.\r\n\r\n![NovaTech X12 Pro Laptop](https://placehold.co/800x450?text=NovaTech+X12+Pro)\r\n\r\n## Key Features\r\n\r\nThe X12 Pro comes loaded with next-generation hardware, wrapped in a precision-machined aluminum chassis that weighs just 1.3 kg. The 14-inch OLED display delivers stunning 2.8K resolution with a 120Hz refresh rate, making every frame buttery smooth whether you\'re editing video or browsing the web. A full-day 72Wh battery keeps you unplugged and productive from morning to midnight.\r\n\r\n## Technical Specifications\r\n\r\n| Specification     | Details                          |\r\n|-------------------|----------------------------------|\r\n| Processor         | Intel Core Ultra 9 185H          |\r\n| RAM               | 32 GB LPDDR5X                    |\r\n| Storage           | 1 TB NVMe PCIe Gen 5 SSD         |\r\n| Display           | 14" OLED, 2880×1800, 120Hz       |\r\n| Graphics          | NVIDIA GeForce RTX 4070 (8 GB)   |\r\n| Battery           | 72 Wh, up to 16 hrs              |\r\n| Operating System  | Windows 11 Pro                   |\r\n| Weight            | 1.3 kg (2.87 lbs)                |\r\n| Starting Price    | $1,799                           |',
          thumbnail_id: '255',
          stock: 100,
          created_at: '2025-11-30T04:39:42.330Z',
          updated_at: '2026-03-08T07:53:15.033Z',
          manufacturer_id: '1',
          discount_product: [],
          final_price: '16990000',
        },
      },
      {
        order_id: '14',
        product_id: '77',
        quantity: 2,
        unit_price: '31990000',
        line_total: '63980000',
        id: '22',
        product: {
          id: '77',
          name: 'iPhone 15 Pro 256GB | Chính hãng VN/A',
          base_price: '31990000',
          description:
            '# NovaTech X12 Pro Laptop\r\n\r\nThe **NovaTech X12 Pro** is a powerhouse designed for creators, developers, and professionals who demand performance without compromise. Slim, fast, and built to last — the X12 Pro redefines what a modern laptop can be.\r\n\r\n![NovaTech X12 Pro Laptop](https://placehold.co/800x450?text=NovaTech+X12+Pro)\r\n\r\n## Key Features\r\n\r\nThe X12 Pro comes loaded with next-generation hardware, wrapped in a precision-machined aluminum chassis that weighs just 1.3 kg. The 14-inch OLED display delivers stunning 2.8K resolution with a 120Hz refresh rate, making every frame buttery smooth whether you\'re editing video or browsing the web. A full-day 72Wh battery keeps you unplugged and productive from morning to midnight.\r\n\r\n## Technical Specifications\r\n\r\n| Specification     | Details                          |\r\n|-------------------|----------------------------------|\r\n| Processor         | Intel Core Ultra 9 185H          |\r\n| RAM               | 32 GB LPDDR5X                    |\r\n| Storage           | 1 TB NVMe PCIe Gen 5 SSD         |\r\n| Display           | 14" OLED, 2880×1800, 120Hz       |\r\n| Graphics          | NVIDIA GeForce RTX 4070 (8 GB)   |\r\n| Battery           | 72 Wh, up to 16 hrs              |\r\n| Operating System  | Windows 11 Pro                   |\r\n| Weight            | 1.3 kg (2.87 lbs)                |\r\n| Starting Price    | $1,799                           |',
          thumbnail_id: '268',
          stock: 100,
          created_at: '2025-11-30T04:39:42.330Z',
          updated_at: '2026-03-08T07:56:11.446Z',
          manufacturer_id: '1',
          discount_product: [],
          final_price: '31990000',
        },
      },
      {
        order_id: '14',
        product_id: '2',
        quantity: 1,
        unit_price: '22990000',
        line_total: '22990000',
        id: '23',
        product: {
          id: '2',
          name: 'OPPO Find X9 12GB 256GB',
          base_price: '22990000',
          description:
            '# Đặc điểm nổi bật của OPPO Find X9 12GB 256GB\n![](https://siaezlhlmwbpqhmm.public.blob.vercel-storage.com/slider-oppo-find-x9-12gb-256gb-2_1.jpg.webp)\n\nOPPO Find X9 là điện thoại flagship cao cấp của OPPO, chính thức ra mắt vào tháng 10/2025, nổi bật với hiệu năng mạnh mẽ từ MediaTek Dimensity 9500 5G (4.21GHz) và RAM 12GB, đáp ứng tốt nhu cầu đa nhiệm, chơi game và quay phim. Máy sở hữu màn hình AMOLED 6.59 inch 1.5K, 120Hz, viền siêu mỏng cho trải nghiệm hiển thị sắc nét, đắm chìm.\n\nBên cạnh đó, OPPO Find X9 được trang bị hệ thống camera hợp tác Hasselblad 50MP cho chất lượng ảnh cao cấp, cùng pin dung lượng lớn 7025 mAh, đảm bảo thời gian sử dụng bền bỉ.\n\n## Có nên mua điện thoại OPPO Find X9?\n\nNếu bạn đang tìm kiếm một chiếc điện thoại OPPO cao cấp toàn diện, OPPO Find X9 là lựa chọn rất đáng cân nhắc.\n\n- Hiệu năng flagship mạnh mẽ: Trang bị chip MediaTek Dimensity 9500 5G, mang lại khả năng xử lý vượt trội, đáp ứng mượt mà mọi tác vụ từ đa nhiệm, chỉnh sửa video đến chơi game đồ họa nặng. Kết hợp với RAM 12GB, máy đảm bảo trải nghiệm ổn định, lâu dài.\n\n- Camera chuẩn nhiếp ảnh chuyên nghiệp: Sự hợp tác giữa OPPO và Hasselblad giúp Find X9 sở hữu khả năng chụp ảnh ấn tượng với màu sắc chân thực, dải tương phản rộng và các chế độ chụp chuyên nghiệp như XPAN. Camera 50MP cho chất lượng ảnh sắc nét, đặc biệt tốt trong điều kiện thiếu sáng.\n\n- Pin sử dụng bền bỉ cả ngày: Pin dung lượng 7025 mAh công nghệ silicon–carbon, cho thời gian sử dụng dài, phù hợp với người dùng thường xuyên làm việc, giải trí hoặc chơi game liên tục.\n\n- Màn hình sắc nét, mượt mà: Máy sở hữu màn hình AMOLED 6.59 inch độ phân giải 1.5K, tần số quét 120Hz, cho hình ảnh sắc nét, màu sắc sống động và thao tác mượt mà. Độ sáng cao giúp hiển thị rõ ràng ngay cả khi sử dụng ngoài trời.\n\n- Thiết kế cao cấp, trải nghiệm đẳng cấp: OPPO Find X9 gây ấn tượng với thiết kế viền siêu mỏng, hoàn thiện cao cấp, mang lại cảm giác sang trọng và trải nghiệm thị giác đắm chìm – đúng chất flagship.\n\n',
          thumbnail_id: '289',
          stock: 100,
          created_at: '2025-11-30T04:22:11.516Z',
          updated_at: '2026-03-08T07:49:38.217Z',
          manufacturer_id: '2',
          discount_product: [],
          final_price: '22990000',
        },
      },
    ],
    app_user: {
      id: '4ec350fa-76f6-4813-879b-b54d0b88e5c4',
      name: 'Việt An',
      email: 'annvbdt+ecom@gmail.com',
      phone: '0346096787',
      address: '23 Nguyễn Biểu',
      profile_pic: '297',
      created_at: '2026-02-19T09:35:49.371Z',
      updated_at: '2026-03-26T15:59:34.006Z',
      is_admin: true,
    },
  };

  const finalOrder = order || exampleOrder;
  return (
    <Html>
      <Head>
        <title>
          {t('email.OrderPlaced.subject', { order_code: finalOrder.code })} -
          CellphoneS
        </title>
      </Head>
      <Tailwind>
        <Body className="p-3 max-w-3xl block mx-auto">
          <Section>
            <Link
              className="font-bold text-2xl text-center block mx-auto"
              href="https://cellphones.com.vn"
            >
              CellphoneS
            </Link>
          </Section>
          <Hr className="my-4 border-gray-300 border-t-2" />
          <Section>
            <Heading as="h3" className="inline-block">
              {t('order.Order information')}{' '}
              <Link href="https://cellphones.com.vn">#{finalOrder.code}</Link>
            </Heading>
            <Section>
              {t('common.Customer')}: {finalOrder.app_user.name} (
              <Text className="inline text-neutral-500">
                {finalOrder.app_user.email}
              </Text>
              )
            </Section>
            <Text>
              {t('profile.Phone')}: {finalOrder.app_user.phone}
            </Text>
            <Text>
              {t('profile.Address')}: {finalOrder.app_user.address}
            </Text>
            <Text>
              {t('order.Created at')}:{' '}
              {dayjs(finalOrder.created_at).format('LT, dddd LL')}
            </Text>
            <Text>
              {t('cart.Payment method')}: {finalOrder.payment_method.name} (
              {finalOrder.payment_method.code})
            </Text>
            {finalOrder.note && (
              <Text>
                {t('order.Note')}: {finalOrder.note}
              </Text>
            )}
            <Heading as="h3">{t('order.Order details')}</Heading>
            <Row cellSpacing={8} className="font-bold bg-neutral-200">
              <Column className="w-1/4">{t('cart.Product')}</Column>
              <Column align="right" className="w-1/8">
                {t('cart.Unit Price')}
              </Column>
              <Column align="center" className="w-1/12">
                {t('cart.Quantity-short')}
              </Column>
              <Column align="right" className="w-1/8">
                {t('cart.Amount')}
              </Column>
            </Row>
            {finalOrder.order_product.map(
              ({ id, product, unit_price, quantity, line_total }) => (
                <Row cellSpacing={8} key={id}>
                  <Column className="w-1/4">{product.name}</Column>
                  <Column align="right" className="w-1/8">
                    {formatPrice(unit_price)}
                  </Column>
                  <Column align="center" className="w-1/12">
                    {quantity}
                  </Column>
                  <Column align="right" className="w-1/8">
                    {formatPrice(line_total)}
                  </Column>
                </Row>
              ),
            )}
            <Row cellSpacing={8}>
              <Column className="w-1/6">{t('cart.Shipping fee')}</Column>
              <Column align="right" className="w-1/6">
                {formatPrice(finalOrder.shipping_fee || 0)}
              </Column>
            </Row>
            <Row cellSpacing={8} className="bg-neutral-200">
              <Column className="w-1/6 font-bold">{t('cart.Total')}</Column>
              <Column align="right" className="w-1/6 font-bold">
                {formatPrice(finalOrder.total_value)}
              </Column>
            </Row>
            <Link
              className="mt-8 inline-block"
              href="https://cellphones.com.vn"
            >
              {t('order.View your order history')}
            </Link>
          </Section>
          <Hr className="my-4 border-gray-300 border-t-2" />
          <Section>
            <Text className="text-center">Footer Banner</Text>
            <Text className="text-center">Contact Info</Text>
            <Link
              className="font-bold text-center block mx-auto"
              href="https://cellphones.com.vn"
            >
              CellphoneS
            </Link>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

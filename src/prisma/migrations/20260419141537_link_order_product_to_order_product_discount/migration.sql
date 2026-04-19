/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_product_discount` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_product_discount` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_product_id` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_product_id_fkey";

-- AlterTable
ALTER TABLE "order_product_discount" DROP COLUMN "order_id",
DROP COLUMN "product_id",
ADD COLUMN     "orderId" BIGINT NOT NULL,
ADD COLUMN     "order_product_id" BIGINT NOT NULL,
ADD COLUMN     "productId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_order_product_id_fkey" FOREIGN KEY ("order_product_id") REFERENCES "order_product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

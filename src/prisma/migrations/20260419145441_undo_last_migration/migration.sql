/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_product_discount` table. All the data in the column will be lost.
  - You are about to drop the column `order_product_id` on the `order_product_discount` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_product_discount` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_productId_fkey";

-- AlterTable
ALTER TABLE "order_product_discount" DROP COLUMN "orderId",
DROP COLUMN "order_product_id",
DROP COLUMN "productId",
ADD COLUMN     "order_id" BIGINT NOT NULL,
ADD COLUMN     "product_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - Added the required column `order_product_id` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product_discount" ADD COLUMN     "order_product_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_order_product_id_fkey" FOREIGN KEY ("order_product_id") REFERENCES "order_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

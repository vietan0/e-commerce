/*
  Warnings:

  - Added the required column `order_id` to the `order_product_discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product_discount" ADD COLUMN     "order_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

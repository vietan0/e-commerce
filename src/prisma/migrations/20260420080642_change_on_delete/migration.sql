-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_order_product_id_fkey";

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_order_product_id_fkey" FOREIGN KEY ("order_product_id") REFERENCES "order_product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

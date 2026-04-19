/*
  Warnings:

  - Added the required column `base_price` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "base_price" DECIMAL(14,3) NOT NULL;

-- CreateTable
CREATE TABLE "order_product_discount" (
    "id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,
    "discount_id" BIGINT NOT NULL,
    "discount_name" VARCHAR(255) NOT NULL,
    "discount_value" DECIMAL(14,3) NOT NULL,
    "discount_type_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "order_product_discount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_product_discount" ADD CONSTRAINT "order_product_discount_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

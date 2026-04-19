/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_product_discount` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_product_discount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_product_id_fkey";

-- AlterTable
ALTER TABLE "order_product_discount" DROP COLUMN "order_id",
DROP COLUMN "product_id";

/*
  Warnings:

  - You are about to drop the column `discount_id` on the `order_product_discount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_product_discount" DROP CONSTRAINT "order_product_discount_discount_id_fkey";

-- AlterTable
ALTER TABLE "order_product_discount" DROP COLUMN "discount_id";

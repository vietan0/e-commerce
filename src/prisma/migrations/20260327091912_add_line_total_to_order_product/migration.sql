/*
  Warnings:

  - Added the required column `line_total` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "line_total" DECIMAL(14,3) NOT NULL;

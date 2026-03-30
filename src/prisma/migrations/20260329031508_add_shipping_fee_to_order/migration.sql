/*
  Warnings:

  - Added the required column `subtotal` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "shipping_fee" DECIMAL(14,3),
ADD COLUMN     "subtotal" DECIMAL(14,3) NOT NULL;

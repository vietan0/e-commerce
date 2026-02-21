/*
  Warnings:

  - Made the column `amount` on table `cart_item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `discount_type` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `file` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `file` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stock` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "discount" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL;

-- AlterTable
ALTER TABLE "discount_type" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "stock" SET NOT NULL;

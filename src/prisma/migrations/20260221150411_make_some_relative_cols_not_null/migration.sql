/*
  Warnings:

  - Made the column `type` on table `discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discount_id` on table `discount_product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `discount_product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `file` required. This step will fail if there are existing NULL values in that column.
  - Made the column `base_price` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacturer_id` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_manufacturer_id_fkey";

-- AlterTable
ALTER TABLE "discount" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "discount_product" ALTER COLUMN "discount_id" SET NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "base_price" SET NOT NULL,
ALTER COLUMN "manufacturer_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - Made the column `file_id` on table `product_image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product_image" ALTER COLUMN "file_id" SET NOT NULL;

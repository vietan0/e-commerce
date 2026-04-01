/*
  Warnings:

  - Made the column `shipping_fee` on table `delivery_type` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "delivery_type" ALTER COLUMN "shipping_fee" SET NOT NULL;

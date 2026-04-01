/*
  Warnings:

  - Added the required column `delivery_type_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_store_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "delivery_type_id" BIGINT NOT NULL,
ALTER COLUMN "store_id" DROP NOT NULL,
ALTER COLUMN "shipping_address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "delivery_type" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "delivery_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_type_code_key" ON "delivery_type"("code");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_delivery_type_id_fkey" FOREIGN KEY ("delivery_type_id") REFERENCES "delivery_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

/*
  Warnings:

  - You are about to drop the column `amount` on the `cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `order_product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "amount",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_product" DROP COLUMN "amount",
ADD COLUMN     "quantity" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `status` on the `order_status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `order_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `order_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unit_price` to the `order_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `order_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_terminal` to the `order_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `order_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "order_status_status_key";

-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "unit_price" DECIMAL(14,3) NOT NULL;

-- AlterTable
ALTER TABLE "order_status" DROP COLUMN "status",
ADD COLUMN     "code" VARCHAR(255) NOT NULL,
ADD COLUMN     "is_terminal" BOOLEAN NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_status_code_key" ON "order_status"("code");

-- CreateIndex
CREATE UNIQUE INDEX "order_status_name_key" ON "order_status"("name");

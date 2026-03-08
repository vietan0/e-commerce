/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail_id" BIGINT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expired_at" SET DEFAULT now() + '30 days'::interval;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

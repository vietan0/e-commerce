-- DropIndex
DROP INDEX "unique_product_id_url";

-- AlterTable
ALTER TABLE "product_image" ADD COLUMN     "file_id" BIGINT;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

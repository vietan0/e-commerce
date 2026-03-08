/*
  Warnings:

  - The `profile_pic` column on the `app_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "app_user" DROP COLUMN "profile_pic",
ADD COLUMN     "profile_pic" BIGINT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expired_at" SET DEFAULT now() + '30 days'::interval;

-- AddForeignKey
ALTER TABLE "app_user" ADD CONSTRAINT "app_user_profile_pic_fkey" FOREIGN KEY ("profile_pic") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
